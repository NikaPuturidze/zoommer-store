import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { deafaultLanguage, supportedLanguages } from '../interfaces/constants'
import * as https from 'https'

@Injectable()
export class DetailsService {
  async details(lang: string, productId: number): Promise<unknown> {
    const selectedLang = supportedLanguages.includes(lang) ? lang : deafaultLanguage

    const hostname = process.env.ENDPOINT_HOSTNAME
    const ip = process.env.ENDPOINT_HOST

    const query = new URLSearchParams({ productId: productId.toString() }).toString()
    const path = `/v1/Products/details?${query}`

    const options: https.RequestOptions = {
      host: ip,
      port: 443,
      path,
      method: 'GET',
      headers: {
        Host: hostname,
        'accept-language': selectedLang,
      },
      servername: hostname,
    }

    return new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        const data: Buffer[] = []

        response.on('data', (chunk: Buffer) => data.push(chunk))
        response.on('end', () => {
          try {
            const json = Buffer.concat(data).toString('utf8')
            const parsed: object = JSON.parse(json) as object

            const translations =
              lang === 'en'
                ? {
                    bundles: {
                      title: 'Together is cheaper',
                      addItem: 'Add item',
                      totalPrice: 'Total price',
                      buy: 'Buy',
                    },
                    additionalInfo: {
                      title: ['Accessories', 'Same', 'Features', 'Branches'],
                    },
                    similar: {
                      title: 'Similar products',
                    },
                    features: {
                      title: 'Additional Features',
                      seeLess: 'See Less',
                      seeMore: 'See More',
                    },
                    warranty: {
                      warranty: {
                        title: 'Get acquainted with the warranty terms',
                        button: 'Warranty Conditions',
                      },
                      manual: {
                        title: 'Get acquainted with the manual',
                        button: 'Manual',
                      },
                      certificate: {
                        title: 'Get acquainted with the certificate',
                        button: 'Certificate',
                      },
                    },
                    branches: {
                      title: 'Branches',
                      inStock: 'In Stock',
                      notInStock: 'Not in stock',
                      soon: '2-5 days from the order',
                      monSat: 'Mon-Sat',
                      sun: 'Sunday',
                      seeLess: 'See Less',
                      seeMore: 'See More',
                    },
                    buy: {
                      display: 1,
                      atBranches: 'მარაგი ფილიალებში',
                      insurance: 'ფასის დაზღვევა',
                      control: 'ფასის კონტროლი',
                      reservation: 'ფასის დაჯავშნა',
                      buy: 'ყიდვა',
                      compare: 'შედარება',
                      add: 'დამატება',
                    },
                  }
                : {
                    bundles: {
                      title: 'ერთად იაფია',
                      addItem: 'დაამატე ნივთი',
                      totalPrice: 'ჯამური ფასი',
                      buy: 'ყიდვა',
                    },
                    additionalInfo: {
                      title: ['აქსესუარები', 'მსგავსი', 'მახასიათებლები', 'ფილიალები'],
                    },
                    similar: {
                      title: 'მსგავსი პროდუქტები',
                    },
                    features: {
                      title: 'დამატებითი მახასიათებლები',
                      seeLess: 'აკეცვა',
                      seeMore: 'მეტის ნახვა',
                    },
                    warranty: {
                      warranty: {
                        title: 'გაეცანი საგარანტიო პირობებს',
                        button: 'საგარანტიო პირობები',
                      },
                      manual: {
                        title: 'გაეცანი პროდუქტის სახელმძღვანელოს',
                        button: 'პროდუქტის სახელმძღვანელო',
                      },
                      certificate: {
                        title: 'გაეცანი სერტიფიკატს',
                        button: 'სერტიფიკატი',
                      },
                    },
                    branches: {
                      title: 'ფილიალები',
                      inStock: 'მარაგშია',
                      notInStock: 'არ არის მარაგში',
                      soon: 'შეკვეთიდან 2-5 დღეში',
                      monSat: 'ორშ-შაბ',
                      sun: 'კვირა',
                      seeLess: 'აკეცვა',
                      seeMore: 'მეტის ნახვა',
                    },
                    buy: {
                      display: 2,
                      atBranches: 'Available at branches',
                      insurance: 'Price insurance',
                      control: 'Price Control',
                      reservation: 'Price reservation',
                      buy: 'Buy',
                      compare: 'Compare',
                      add: 'Add',
                    },
                  }

            resolve({
              ...parsed,
              translations,
            })
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            reject(new BadRequestException('Failed to parse response from Zoommer API: ' + message))
          }
        })
      })

      request.on('error', (error) => {
        console.error('Error fetching details:', error)
        reject(new ConflictException('Failed to fetch details'))
      })

      request.end()
    })
  }
}
