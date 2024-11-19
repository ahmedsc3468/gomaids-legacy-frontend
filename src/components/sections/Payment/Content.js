import react from "react";

const Payment = () => {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Credit/Debit
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Paypal
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Payment;
