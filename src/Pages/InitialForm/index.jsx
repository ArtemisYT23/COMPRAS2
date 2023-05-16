import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateFormActive } from "../../Redux/States/DocumentData";
import Header from "../../Components/Header";
import BodyInfo from "../../Components/BodyInfo";
import AplicantInfo from "../../Components/AplicantInfo";
import ViewFiles from "../../Components/ViewFiles";
import DataWinner from "../../Components/DataWinner";
import InfoDataClose from "../../Components/InfoDataClose";

const InitialForm = () => {
  const dispatch = useDispatch();
  const { documentary } = useSelector((store) => store);
  const { VerifyActiveDoc } = documentary;

  useEffect(() => {
    const URI = document.URL;
    const doc = URI.split("?");
    dispatch(validateFormActive(doc[1]));
  }, []);

  return (
    <>
      <Header />

      {VerifyActiveDoc == false ? (
        <InfoDataClose />
      ) : (
        <>
          <BodyInfo />
          <AplicantInfo />
          <ViewFiles />
          <DataWinner />
        </>
      )}
    </>
  );
};
export default InitialForm;
