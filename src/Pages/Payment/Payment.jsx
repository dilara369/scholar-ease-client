import { useLoaderData } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
// todo : add key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const Payment = () => {
    const loaderData = useLoaderData()

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <Elements stripe={stripePromise}>
                <CheckoutForm loaderData={loaderData?.scholarship} />
            </Elements>
        </div>
    );
};

export default Payment;