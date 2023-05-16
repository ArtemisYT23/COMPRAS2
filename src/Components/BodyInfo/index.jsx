import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import styled from "styled-components";
import { ContainerHeader } from "../../Styles/Form";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const BodyInfo = () => {
  const dispatch = useDispatch();
  const { documentary } = useSelector((store) => store);
  const { DocumentInfo, ValueDefault } = documentary;

  return (
    <ContainerHeader>
      <Header>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-calendar"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="inputgroup"
              type="text"
              value={DocumentInfo ? DocumentInfo[1]?.metadataValue : ValueDefault}
              disabled
            />
          </span>
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-building"></i>
          </span>
          <span className="p-float-label">
            <InputText
              id="inputgroup"
              type="text"
              value={DocumentInfo ? DocumentInfo[0]?.metadataValue : ValueDefault}
              disabled
            />
          </span>
        </div>
      </Header>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 3500,
          style: {
            background: "var(--PrimaryColor)",
            color: "#fff",
          },
        }}
      />
    </ContainerHeader>
  );
};

export default BodyInfo;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  padding: 1rem;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;

    div {
      margin: 0 0 1rem 0;
    }
    div:nth-child(1) {
      margin: 1rem 0 0 0;
    }
  }
`;
