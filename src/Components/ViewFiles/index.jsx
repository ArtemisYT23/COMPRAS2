import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingApp from "../../Utilities/LoadingApp";
import { changeNumberFiles } from "../../Redux/States/DocumentData";

const ViewFiles = () => {
  const dispatch = useDispatch();
  const { documentary } = useSelector((store) => store);
  const { FilesSave, PagesFiles } = documentary;
  const [file, setFile] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    // console.log(FilesSave);
    const Enabling = [];
    FilesSave.forEach((file) => {
      Enabling.push(`data:${file.contentType};base64,${file.byteFile}`);
    });
    setFile(Enabling);
    if (file != "") {
      setActive(false);
    }
  }, [FilesSave]);

  const OpenPreviewFile = (e) => {
    dispatch(changeNumberFiles(e.target.value));
  };

  const DownLoadFile = (url, Num) => {
    saveAsExcelFile(url, `Cotizacion ${Num}`);
  };

  const saveAsExcelFile = (url, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        const data = url;
        module.default.saveAs(data, fileName + "_export_" + new Date());
      }
    });
  };

  return (
    <ContainerHeader>
      <Header>
        {/* {active ? (
          <LoadingApp />
        ) : ( */}
          <>
            <ContainerContent>
              <iframe src={file[PagesFiles]} height="100%" width="70%" />
              <br />
              <ContentPaginator>
                <Button
                  onClick={(e) => DownLoadFile(file[PagesFiles], PagesFiles)}
                >
                  <span>Descargar</span>
                </Button>
                {FilesSave ? (
                  FilesSave.map((file, i) => (
                    <button key={i} value={i} onClick={(e) => OpenPreviewFile(e)}>
                      {i + 1}
                    </button>
                  ))
                ) : (
                  <></>
                )}
              </ContentPaginator>
            </ContainerContent>
          </>
        {/* )} */}
      </Header>
    </ContainerHeader>
  );
};

export default ViewFiles;

export const ContainerHeader = styled.div`
  width: 900px;
  height: 100%;
  margin: 0 0 0.3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
  }
`;

const Header = styled.div`
  width: 80%;
  height: 600px;
  border-radius: 13px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  padding: 1rem;
  @media screen and (max-width: 767px) {
    display: flex;
  }
`;

const ContainerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContentPaginator = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 35px;
    height: 35px;
    margin: 0.5rem;
    color: var(--PrimaryColor);
    cursor: pointer;
  }
`;

const Button = styled.div`
  background: var(--PrimaryColor);
  color: #fff;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
