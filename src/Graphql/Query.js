import {gql} from '@apollo/client';

export const DOCUMENT_GET_DATA = gql`
  query getAccessMenuDetails($accessCode: String) {
    getAccessMenuDetails(input: {accessCode: $accessCode}) {
      accessMenu {
        id
        identifier
        titles {
          id
          languageCode
          value
        }
        names {
          id
          languageCode
          value
        }
        descriptions {
          id
          languageCode
          value
        }
        languages {
          id
          languageCode
        }
        deliverySettings {
          kind
          limit
          cost
        }
        isMain
        characteristics {
          kind
          value
        }
        logo
        copiedLogos {
          id
          quality
          fileName
          fileUrl
        }
        urlCode
        categories {
          id
          identifier
          order
          names {
            id
            languageCode
            value
          }
          descriptions {
            id
            languageCode
            value
          }
          picture {
            fileUrl
          }
          products {
            id
            identifier
            names {
              id
              languageCode
              value
            }
            shortDescriptions {
              id
              languageCode
              value
            }
            longDescriptions {
              id
              languageCode
              value
            }
            picture {
              fileUrl
            }
            price {
              value
              currency {
                id
                code
              }
            }
          }
          subCategories {
            id
            identifier
            products {
              id
              identifier
              picture {
                fileUrl
              }
            }
            picture {
              fileUrl
            }
          }
        }
      }
    }
  }
`;
