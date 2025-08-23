import React, { useState } from "react";
import styles from "./AddForms.module.css";

const AddForms = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [radio, setRadio] = useState("");
  const [monthlyRepayment, setMonthlyRepayment] = useState("null");
  const [showResults, setShowResults] = useState(true);
  const [errors, setErrors] = useState({
    mortgageAmount: "",
    mortgageTermn: "",
    interestRate: "",
    repayement: "",
    interinterestOnly: "",
  });

  const handleSubmiit = e => {
    e.preventDefault();

    const newErrors = {};

    if (!amount || amount <= 0) {
      newErrors.mortgageAmount = "Enter a valid mortgage amount";
    }
    if (!term || term <= 0) {
      newErrors.mortgageTermn = "Enter a valid term";
    }
    if (!rate || rate <= 0) {
      newErrors.interestRate = "Enter a valid interest rate";
    }
    if (!radio) {
      newErrors.repayement = "Please select a mortgage type";
    }

    // Якщо є помилки
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Очистка, якщо все добре

    const principal = Number(amount);
    const annualRate = Number(rate) / 100;
    const monthlyRate = annualRate / 12;
    const totalPayments = parseInt(term) * 12;

    let monthlyPayment = 0;
    let totalRepayment = 0;

    if (radio === "repayement") {
      monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      totalRepayment = monthlyPayment * totalPayments;
    } else if (radio === "interinterestOnly") {
      monthlyPayment = principal * monthlyRate;
      totalRepayment = monthlyPayment * totalPayments;
    }

    setMonthlyRepayment({
      monthly: monthlyPayment.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }),
      total: totalRepayment.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }),
    });

    setShowResults(false);
  };

  const handleRadioChange = e => {
    const radio = e.target.value;
    setRadio(radio);
  };

  const clearButton = e => {
    setAmount(0);
    setTerm(0);
    setRate(0);
    setRadio("repayement");
    setMonthlyRepayment("");
    setErrors({
      mortgageAmount: "",
      mortgageTermn: "",
      interestRate: "",
      repayement: "",
      interinterestOnly: "",
    });
    setShowResults(true);
  };

  return (
    <form className={styles.containerMortgageFroms} onSubmit={handleSubmiit}>
      <div className={styles.form}>
        <div className={styles.header}>
          <h2>Mortgage Calculator</h2>
          <button
            className={styles.clearBtn}
            type="button"
            onClick={clearButton}
          >
            Clear All
          </button>
        </div>

        <label className={styles.label} htmlFor="mortgageAmount">
          Mortgage Amount
        </label>
        <div className={styles.inputWithPrefix}>
          <span>£</span>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="mortgageAmount"
            id="mortgageAmount"
          />
        </div>
        {errors.mortgageAmount && (
          <p className={styles.error}>{errors.mortgageAmount}</p>
        )}
        <div className={styles.row}>
          <div>
            <label className={styles.label} htmlFor="mortgageTermn">
              Mortgage Termn
            </label>
            <div className={styles.inputWithSuffix}>
              <input
                type="number"
                value={term}
                onChange={e => setTerm(e.target.value)}
                className="mortgageTermn"
                id="mortgageTermn"
              />
              <span>years</span>
            </div>
            {errors.mortgageTermn && (
              <p className={styles.error}>{errors.mortgageTermn}</p>
            )}
          </div>
          <div>
            <label className={styles.label} htmlFor="interestRate">
              Interest Rate
            </label>
            <div className={styles.inputWithSuffix}>
              <input
                type="number"
                value={rate}
                onChange={e => setRate(e.target.value)}
                className="interestRate"
                id="interestRate"
              />
              <span>%</span>
            </div>
            {errors.interestRate && (
              <p className={styles.error}>{errors.interestRate}</p>
            )}
          </div>
        </div>

        <div>
          <label className={styles.label}>Mortgage Type</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                className="repayement"
                id="repayement"
                value="repayement"
                checked={radio === "repayement"}
                onChange={handleRadioChange}
              />
              Repayement
            </label>

            <label>
              <input
                type="radio"
                className="interinterestOnly"
                id="interinterestOnly"
                value="interinterestOnly"
                checked={radio === "interinterestOnly"}
                onChange={handleRadioChange}
              />
              Interinterest Only
            </label>
          </div>
          {errors.repayement && (
            <p className={styles.error}>{errors.repayement}</p>
          )}
        </div>

        <button
          className={styles.inputBtn}
          type="button"
          onClick={handleSubmiit}
        >
          <span> Calculate Repayments</span>
        </button>
      </div>

      <div className={styles.resultSection}>
        {showResults ? (
          <div className={styles.resultShown}>
            <h3>Results shown here</h3>
            <p>
              Complete the form and click “calculate repayments” to see what
              your monthly repayments would be.
            </p>
          </div>
        ) : (
          <div>
            <h3>Your results</h3>
            <p>
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </p>
            <div className={styles.resultContainer}>
              <div className={styles.resultContainerMonthly}>
                <p>Your monthly repayments</p>
                <p>£{monthlyRepayment.monthly}</p>
              </div>
              <div className={styles.resultContainerTotal}>
                <p>Total you'll repay over the term</p>
                <p>£{monthlyRepayment.total}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default AddForms;
