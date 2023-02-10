import React, {useState} from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import SignIn from './components/SignIn';
import Header from './components/Header';
import Footer from './components/Footer';

type MyPaymentMetadata = {};

type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
};

export type User = AuthResult['user'];

interface PaymentDTO {
  amount: number,
  user_uid: string,
  created_at: string,
  identifier: string,
  metadata: Object,
  memo: string,
  status: {
    developer_approved: boolean,
    transaction_verified: boolean,
    developer_completed: boolean,
    cancelled: boolean,
    user_cancelled: boolean,
  },
  to_address: string,
  transaction: null | {
    txid: string,
    verified: boolean,
    _link: string,
  },
};

// Make TS accept the existence of our window.__ENV object - defined in index.html:
interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
  }
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true});
const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};


export default function Shop() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const signIn = async () => {
    const scopes = ['username', 'payments'];
    const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    signInUser(authResult);
    setUser(authResult.user);
  }
  const signOut = () => {
    setUser(null);
    signOutUser();
  }

  const signInUser = (authResult: AuthResult) => {
    axiosClient.post('/user/signin', {authResult});
    return setShowModal(false);
  }

  const signOutUser = () => {
    return axiosClient.get('/user/signout');
  }

  const onModalClose = () => {
    setShowModal(false);
  }

  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(user === null) {
      return setShowModal(true);
    }
    const paymentData = { amount, memo, metadata: paymentMetadata };
    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    };
    const payment = await window.Pi.createPayment(paymentData, callbacks);
    console.log(payment);
  }

  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post('/payments/incomplete', {payment});
  }

  const onReadyForServerApproval = (paymentId: string) => {
    console.log("onReadyForServerApproval", paymentId);
    axiosClient.post('/payments/approve', {paymentId}, config);
  }

  const onReadyForServerCompletion = (paymentId: string, txid: string) => {
    console.log("onReadyForServerCompletion", paymentId, txid);
    axiosClient.post('/payments/complete', {paymentId, txid}, config);
  }

  const onCancel = (paymentId: string) => {
    console.log("onCancel", paymentId);
    return axiosClient.post('/payments/cancelled_payment', {paymentId});
  }

  const onError = (error: Error, payment?: PaymentDTO) => {
    console.log("onError", error);
    if (payment) {
      console.log(payment);
      // handle the error accordingly
    }
  }

  return (
    <>
      <Header user={user} onSignIn={signIn} onSignOut={signOut} onClickSearch={function (): void {
        throw new Error('Function not implemented.');
      } }/>


      <ProductCard
        name="Research Papers"
        description="Get access to Latest Academic papers"
        price={3}
        pictureURL="/images/papers.jpeg"
        pictureCaption="Picture by Acade Academy- https://acadeapp.com"
        onClickBuy={() => orderProduct("Research paper", 3, { productId: 'r_paper_1' })}
      />
      <ProductCard
        name="Questions and Answers"
        description="Eccess Expert solution to your Academic Assignments"
        price={5}
        pictureURL="/images/Q&A.jpg"
        pictureCaption="Picture by Acade Academy- https://acadeapp.com"
        onClickBuy={() => orderProduct("Question with Solutions", 5, { productId: 'solution_1' })}
      />
       <ProductCard
        name="Research Papers"
        description="Get access to Latest Academic papers"
        price={3}
        pictureURL="/images/papers.jpeg"
        pictureCaption="Picture by Acade Academy- https://acadeapp.com"
        onClickBuy={() => orderProduct("Research paper", 3, { productId: 'r_paper_2' })}
      />
      <ProductCard
        name="Questions and Answers"
        description="Eccess Expert solution to your Academic Assignments"
        price={5}
        pictureURL="/images/Q&A.jpg"
        pictureCaption="Picture by Acade Academy- https://acadeapp.com"
        onClickBuy={() => orderProduct("Question with Solutions", 5, { productId: 'solution_2' })}
      />
       <ProductCard
        name="Research Papers"
        description="Get access to Latest Academic papers"
        price={3}
        pictureURL="/images/papers.jpeg"
        pictureCaption="Picture by Acade Academy- https://acadeapp.com"
        onClickBuy={() => orderProduct("Research paper", 3, { productId: 'r_paper_3' })}
      />
      <ProductCard
        name="Questions and Answers"
        description="Eccess Expert solution to your Academic Assignments"
        price={5}
        pictureURL="/images/Q&A.jpg"
        pictureCaption="Picture by Acade Academy- https://acadeapp.com"
        onClickBuy={() => orderProduct("Question with Solutions", 5, { productId: 'solution_3' })}
      />
       <ProductCard
        name="Research Papers"
        description="Get access to Latest Academic papers"
        price={3}
        pictureURL="/images/papers.jpeg"
        pictureCaption="Picture by Acade Academy- https://acadeapp.com"
        onClickBuy={() => orderProduct("Research paper", 3, { productId: 'r_paper_4' })}
      />
      <ProductCard
        name="Questions and Answers"
        description="Eccess Expert solution to your Academic Assignments"
        price={5}
        pictureURL="/images/Q&A.jpg"
        pictureCaption="Picture by Acade Academy- https://acadeapp.com"
        onClickBuy={() => orderProduct("Question with Solutions", 5, { productId: 'solution_4' })}
      />

      
      { showModal && <SignIn onSignIn={signIn} onModalClose={onModalClose} /> }

      <Footer user={user} onAccount={signIn} onProfile={signOut} />
    </>
  );
}
