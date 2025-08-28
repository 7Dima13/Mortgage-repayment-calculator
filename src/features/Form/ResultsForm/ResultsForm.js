import styles from "./ResultsForm.module.css";

const ResultsForm = monthlyRepayment => {
  return (
    <div>
      <h3>Your results</h3>
      <p>
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click “calculate repayments”
        again.
      </p>
      <div className={styles.resultContainer}>
        <div className={styles.resultContainerMonthly}>
          <p>Your monthly repayments</p>
          <p>£{monthlyRepayment.monthlyRepayment.monthly}</p>
        </div>
        <div className={styles.resultContainerTotal}>
          <p>Total you'll repay over the term</p>
          <p>£{monthlyRepayment.monthlyRepayment.total}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsForm;
