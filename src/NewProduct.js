import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Divider,
  useToast,
  Center,
  Button,
  Skeleton,
} from '@chakra-ui/react';
const NewProduct = () => {
  const toast = useToast();
  const [product, setProduct] = React.useState({
    name: '',
    sku: '',
    price: '',
    image: false,
  });
  const [loading, setLoading] = React.useState(false);
  const submitForm = () => {
    let formdata = new FormData();
    Object.entries(product).map(([key, value]) => {
      formdata.append(key, value);
    });
    fetch('/', {
      method: 'POST',
      body: formdata,
    });
  };
  return (
    <>
      <Heading>Yeni Ürün Ekle</Heading>
      <Divider my="3" />
      <FormControl>
        <FormLabel>Ürün Adı</FormLabel>
        <Skeleton
          startColor="orange.100"
          endColor="orange.500"
          isLoaded={!loading}
        >
          <Input
            type="text"
            value={product.name}
            onChange={(e) =>
              setProduct((r) => ({ ...r, name: e.target.value }))
            }
          />
        </Skeleton>
      </FormControl>
      <Divider my="3" />
      <FormControl>
        <FormLabel>Ürün Stok Kodu</FormLabel>{' '}
        <Skeleton
          startColor="orange.100"
          endColor="orange.500"
          isLoaded={!loading}
        >
          <Input
            type="text"
            value={product.sku}
            onChange={(e) => setProduct((r) => ({ ...r, sku: e.target.value }))}
          />
        </Skeleton>
      </FormControl>
      <Divider my="3" />
      <FormControl>
        <FormLabel>Ürün Fiyatı</FormLabel>{' '}
        <Skeleton
          startColor="orange.100"
          endColor="orange.500"
          isLoaded={!loading}
        >
          <Input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct((r) => ({ ...r, price: e.target.value }))
            }
          />
        </Skeleton>
      </FormControl>

      <Divider my="3" />
      <FormControl>
        <FormLabel>Ürün Resmi</FormLabel>{' '}
        <Skeleton
          startColor="orange.100"
          endColor="orange.500"
          isLoaded={!loading}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              let file = e.target.files[0];
              if (new String(file.type).includes('image')) {
                setProduct((r) => ({ ...r, image: file }));
              } else {
                e.target.value = '';
                toast({
                  title: 'Hata',
                  description:
                    'Yalnızca görsel seçebilirsiniz, ' +
                    file.name +
                    ' dosyası bir görsel değil.',
                  status: 'error',
                  duration: 4000,
                  isClosable: true,
                });
                setProduct((r) => ({ ...r, image: false }));
              }
            }}
          />
        </Skeleton>
      </FormControl>

      <Divider my="3" />
      <Center>
        <Button colorScheme="green" onClick={submitForm}>
          Ekle
        </Button>
      </Center>
    </>
  );
};
export default NewProduct;
