import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ContainerHeader } from "../../Styles/Form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { getEntitiesProvider } from "../../Redux/States/DocumentData";
import axios from "axios";
import { SaveDocumentUpdate } from "../../Config/axios";
import {
  saveElementSelectedValueWinner,
  saveElementSelectedCotizacionWinner,
  saveElementSelectedProviderMail,
  saveElementSelectedProviderRuc,
  saveElementSelectedProviderName,
  getStateByActiveResponse,
} from "../../Redux/States/InfoData";
import { PublicRoutes } from "../../Models/routes";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const DataWinner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documentary, dataState } = useSelector((store) => store);
  const { DocumentInfo, Entities, FilesSave } = documentary;
  const {
    cotizationWinner,
    valorWinner,
    mailProvider,
    rucProvider,
    nameProvider,
    activeState,
    activeStateText,
  } = dataState;
  const [handleChange, setHandleChange] = useState("");
  const [name, setName] = useState(false);
  const [ruc, setRuc] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState({});
  const [selectedCotization, setSelectedCotization] = useState({});

  useEffect(() => {
    const obj = {
      numOfForm: 2,
      cost: parseFloat(valorWinner),
      businessName: DocumentInfo[0]?.metadataValue,
      categoryBuy: DocumentInfo[2]?.metadataValue,
      costCenter: DocumentInfo[6]?.metadataValue,
    };
    console.log(obj);
    dispatch(getStateByActiveResponse(obj));
  }, [valorWinner]);

  useEffect(() => {
    dispatch(getEntitiesProvider());
  }, [handleChange]);

  const changeActiveCheck = (value) => {
    setHandleChange(value);
    if (value === "Nombre") {
      setName(true);
      setRuc(false);
    } else {
      setName(false);
      setRuc(true);
    }
  };

  const onBusinessChange = (e) => {
    setSelectedProvider(e.value);
    dispatch(saveElementSelectedProviderMail(e.value.proveedor));
    dispatch(saveElementSelectedProviderName(e.value.correoProveedor));
    dispatch(saveElementSelectedProviderRuc(e.value.ruc));
  };

  const handleValueWinner = (value) => {
    // console.log(value);
    if (value != "") {
      dispatch(
        saveElementSelectedValueWinner(
          value.replace(/[^0-9,.]/g, "").replace(/,/g, ".")
        )
      );
    }
  };

  const onCotizationChange = (e) => {
    setSelectedCotization(e.value);
    dispatch(saveElementSelectedCotizacionWinner(e.value.fileTypeName));
  };

  const handleSubmit = () => {
    const URI = document.URL;
    const doc = URI.split("?");

    const FormData = DocumentInfo.map((document, i) => {
      if (document.indexCode == 37) {
        document.metadataValue = mailProvider;
      }
      if (document.indexCode == 43) {
        document.metadataValue = valorWinner;
      }
      if (document.indexCode == 51) {
        document.metadataValue = rucProvider;
      }
      if (document.indexCode == 71) {
        document.metadataValue = cotizationWinner;
      }
      if (document.indexCode == 76) {
        document.metadataValue = nameProvider;
      }
      return document;
    });

    const objectSave = {
      documentCode: doc[1],
      documentMetadataJson: FormData,
    };
    // console.log(objectSave);

    axios({
      url: `${SaveDocumentUpdate}updatedocumentmetadata`,
      method: "PUT",
      data: objectSave,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response.status);
          navigate(`/${PublicRoutes.SUCCESS}`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ContainerHeader>
      <Header>
        <p>Cotizacion Ganadora</p>
        <div className="p-inputgroup">
          <Dropdown
            value={selectedCotization}
            options={FilesSave}
            onChange={onCotizationChange}
            optionLabel="fileTypeName"
            placeholder="Seleccione La Cotizacion Ganadora"
            filter
          />
        </div>
      </Header>
      {cotizationWinner != null && (
        <Header>
          <p>Valor De Cotizacion Ganadora</p>
          <div className="p-inputgroup">
            <InputText
              id="inputgroup"
              type="text"
              className="input-form"
              onBlur={(e) => handleValueWinner(e.target.value)}
            />
          </div>
        </Header>
      )}

      {activeStateText != "" && activeState == false ? (
        <Header>
          <p>{activeStateText}</p>
        </Header>
      ) : (
        <></>
      )}

      {valorWinner != 0 && activeState == true ? (
        <>
          <Header>
            <>
              <p>NOMBRE DE PROVEEDOR</p>
              <input
                type="checkbox"
                value="Nombre"
                checked={name}
                onChange={(e) => changeActiveCheck(e.target.value)}
              />
            </>
            <br />
            <>
              <p>RUC DE PROVEEDOR</p>
              <input
                type="checkbox"
                value="Ruc"
                checked={ruc}
                onChange={(e) => changeActiveCheck(e.target.value)}
              />
            </>
          </Header>

          {handleChange === "Nombre" && (
            <Header>
              <p>NOMBRE DE PROVEEDOR</p>
              <div className="p-inputgroup">
                <Dropdown
                  value={selectedProvider}
                  options={Entities}
                  onChange={onBusinessChange}
                  optionLabel="proveedor"
                  placeholder="Seleccione Un Proveedor por Razon Social"
                  filter
                />
              </div>
            </Header>
          )}
          {handleChange == "Ruc" && (
            <Header>
              <p>RUC DE PROVEEDOR</p>
              <div className="p-inputgroup">
                <Dropdown
                  value={selectedProvider}
                  options={Entities}
                  onChange={onBusinessChange}
                  optionLabel="ruc"
                  placeholder="Seleccione Una Proveedor por RUC"
                  filter
                />
              </div>
            </Header>
          )}

          {selectedProvider && (
            <Header>
              <p>Correo Proveedor</p>
              <div className="p-inputgroup">
                <InputText
                  id="inputgroup"
                  disabled
                  value={selectedProvider?.correoProveedor}
                  className="input-form"
                />
              </div>
            </Header>
          )}
        </>
      ) : (
        <></>
      )}

      {cotizationWinner != null &&
        valorWinner != 0 &&
        activeState == true &&
        mailProvider != null &&
        rucProvider != null &&
        nameProvider != null && (
          <>
            <br />
            <br />
            <ButtonSubmit
              onClick={(e) => {
                handleSubmit(e)
              }}
            >
              ENVIAR
            </ButtonSubmit>
          </>
        )}

      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 6000,
          style: {
            background: "var(--PrimaryColor)",
            color: "#fff",
            fontSize: "19px",
          },
        }}
      />
    </ContainerHeader>
  );
};

export default DataWinner;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  padding: 1.3rem;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    padding: 1rem;

    p {
      width: 90%;
    }

    div {
      margin: 1rem 0 0 0;
    }
  }

  p {
    text-align: center;
    text-decoration-style: solid;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 4px solid var(--PrimaryColor);
    margin: 0 1rem 0 0;
    font-weight: bold;
  }
`;

const ButtonValidate = styled.button`
  width: 100%;
  height: 50px;
  background-color: #5176f1;
  color: #fff;
  border: none;
  border-radius: 13px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ButtonSubmit = styled.button`
  width: 100%;
  height: 50px;
  background-color: var(--PrimaryColor);
  color: #fff;
  border: none;
  border-radius: 13px;
  font-size: 1.5rem;
  cursor: pointer;
`;
