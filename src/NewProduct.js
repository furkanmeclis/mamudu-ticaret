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
  const titleRef = React.useRef(null);
  const [product, setProduct] = React.useState({
    name: '',
    sku: '',
    price: '',
    image: false,
  });
  const [loading, setLoading] = React.useState(false);
  const submitForm = (e) => {
    
    setLoading(true);
    e.preventDefault();
    let formdata = new FormData();
    Object.entries(product).map(([key, value]) => {
      formdata.append(key, value);
    });
    fetch('/', {
      method: 'POST',
      body: formdata,
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.status) {
          toast({
            title: 'Başarılı',
            description: 'Ürün Eklendi',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          setProduct({
            name: '',
            sku: '',
            price: '',
            image: false,
          });
          titleRef.current.focus();
        } else {
          toast({
            title: 'Hata',
            description: 'Ürün Eklenemedi',
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Hata',
          description: 'Ürün Eklenemedi',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
        titleRef.current.focus();
      });
  };
  return (
    <>
      <Heading>Yeni Ürün Ekle</Heading>
      <Divider my="3" />
      <form onSubmit={submitForm}>
        <FormControl>
          <FormLabel>Ürün Adı</FormLabel>
          <Skeleton
            startColor="orange.100"
            endColor="orange.500"
            isLoaded={!loading}
          >
            <Input
              type="text"
              ref={titleRef}
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
              onChange={(e) =>
                setProduct((r) => ({ ...r, sku: e.target.value }))
              }
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
          <Button type="submit" colorScheme="green">
            Ekle
          </Button>
        </Center>
      </form>
    </>
  );
};
export default NewProduct;
