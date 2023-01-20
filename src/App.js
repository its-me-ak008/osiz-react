import { useCallback, useState } from "react";
import useRazorpay from "react-razorpay";
import { keys } from "./config";
import './App.css';

export default function App() {
  const Razorpay = useRazorpay();
  const [amount, setAmount] = useState('')
  const [showerror, setShowerror] = useState('')

  const handlePayment = useCallback(async () => {
    const options = {
      key: keys.razor_key,
      amount: amount,
      currency: "INR",
      name: "Aswin test",
      description: "Test Transaction",
      image: "https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/6087f2b060c7a92408bac811_logo.svg",
      order_id: "order_L6X7XoDOHVyght",
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "aswinkumar",
        email: "aswin@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <div className="input">
        <h1>Payment</h1>
        <span>Enter the amount to pay</span>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            // if (amount !== '' && amount > 0) {
            setShowerror('')
            handlePayment();
            // var instance = new Razorpay({ key_id: keys.razor_key, key_secret: keys.rezor_secret })

            // var options = {
            //   amount: (amount * 100),  // amount in the smallest currency unit
            //   currency: "INR",
            // };
            // instance.orders.create(options, function (err, order) {
            //   console.log(order);
            // });
            // }
            // else {
            //   setShowerror('Enter the valid amount')
            // }
          }}
        >
          <input
            onChange={(e) => {
              setAmount(e.target.value);
              setShowerror('')
            }
            }
            disabled
            type={"number"}
            value={amount}
            className="form-control"
          />
          {
            showerror && <sub>{showerror}</sub>
          }
          <button>Click</button>
        </form>
        <div className="note">
          <p>Note:</p>
          <div>
            <sub>While hit the order api cors error occur</sub>
            <sub>and the razorpay requires the node sever to hit the api.</sub>
            <sub>I just manually made the order by postman.</sub>
          </div>
        </div>
      </div>
    </div>
  );
}