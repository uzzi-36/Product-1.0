import axios from "axios";
import { useFormik } from 'formik';
import * as yup from 'yup';
import './App.css';

function App() {


  const myFormik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productDescription: '',
    },
    validationSchema:
      yup.object({
        productName: yup
          .string('Enter your product name')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(20, "please enter within 20 characters "),

        productPrice: yup
          .number('Enter your product price')
          .positive("enter positive product price")
          .required('product name is required'),

        productDescription: yup
          .string('Enter your product Description')
          .required('product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(500, "please enter within 20 characters "),
      }),

    onSubmit: (values) => {
      console.log("values: ", values);

      axios.post('http://localhost:5001/product', {
        name: values.productName,
        price: values.productPrice,
        description: values.productDescription,
      })
        .then(response => {
          console.log("response: ", response.data);

        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });







  return (
    <form onSubmit={myFormik.handleSubmit}>
      <input
        id="productName"
        placeholder="Product Name"
        value={myFormik.values.productName}
        onChange={myFormik.handleChange}
      />
      {
        (myFormik.touched.productName && Boolean(myFormik.errors.productName)) ?
          <span style={{ color: "red" }}>{myFormik.errors.productName}</span>
          :
          null
      }

      <br />
      <input
        id="productPrice"
        placeholder="Product Price"
        value={myFormik.values.productPrice}
        onChange={myFormik.handleChange}
      />
      {
        (myFormik.touched.productPrice && Boolean(myFormik.errors.productPrice)) ?
          <span style={{ color: "red" }}>{myFormik.errors.productPrice}</span>
          :
          null
      }

      <br />
      <input
        id="productDescription"
        placeholder="Product Description"
        value={myFormik.values.productDescription}
        onChange={myFormik.handleChange}
      />
      {
        (myFormik.touched.productDescription && Boolean(myFormik.errors.productDescription)) ?
          <span style={{ color: "red" }}>{myFormik.errors.productDescription}</span>
          :
          null
      }

      <br />

      

      <button type="submit"> Submit </button>
    </form>

  );
}

export default App;
