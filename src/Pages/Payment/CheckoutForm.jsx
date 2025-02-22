
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import ApplyForm from "../../Components/Accessories/ApplyForm/ApplyForm";

const CheckoutForm = ({ loaderData }) => {
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [open, setOpen] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const price = loaderData?.applicationFees
    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post("/create-payment-intent", { price })
                .then(res => {
                    if (res?.data?.clientSecret) {
                        setClientSecret(res.data.clientSecret);
                    } else {
                        toast.error("Payment initialization failed. Please try again.");
                    }
                })
                .catch(err => {
                    console.error("Error creating payment intent:", err);
                    toast.error("Failed to initiate payment.");
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setIsProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            toast.error("Invalid card details.");
            setIsProcessing(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {

            toast.error(error.message, { autoClose: 3000, theme: "colored" });
            setIsProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                },
            },
        });

        if (confirmError) {
            console.error("Confirm error", confirmError);
            toast.error(confirmError.message, { autoClose: 3000, theme: "colored" });
        } else {

            if (paymentIntent.status === 'succeeded') {

                setOpen(true)
                toast.success("Payment successful", {
                    autoClose: 3000,
                    theme: "colored",
                    position: 'top-center'
                });
            }
        }

        setIsProcessing(false);
    };

    return (
        <div>
            <ToastContainer />
            <h1 className="text-3xl font-semibold my-10">Application Fee : $ {price}</h1>

            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "20px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    className="bg-secondary py-2 w-full mt-10 rounded-md hover:scale-105 duration-500 hover:shadow-2xl"
                    type="submit"
                    disabled={!stripe || !clientSecret || isProcessing}
                >
                    {isProcessing ? "Processing..." : "Pay"}
                </button>
            </form>
            {open ?
                <ApplyForm data={loaderData}></ApplyForm>
                : ''}
        </div>
    );
};

export default CheckoutForm;
