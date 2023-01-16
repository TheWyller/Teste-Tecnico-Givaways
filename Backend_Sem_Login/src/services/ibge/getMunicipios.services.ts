import axios from "axios";
import https from "node:https";
import crypto from "crypto";
import { IIBGEData } from "../../interfaces/ibge";
import { AppDataSource } from "../../data-source";
import { IBGE } from "../../entities/ibge.entity";

export const api = axios.create({
  baseURL:
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios",

  httpsAgent: new https.Agent({
    secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
  }),
});

const getAll = async () => {
  let allData: IIBGEData[] = [];
  await api
    .get("", {})
    .then((res) => {
      allData = res.data;
    })
    .catch((err) => console.error(err));

  return allData;
};

const getMunicipiosServices = async () => {
  const AllData = await getAll();
  const AllDataMod = AllData.map((elem) => {
    return { id: elem.id, nome: elem.nome };
  });

  const ibgeRepository = AppDataSource.getRepository(IBGE);
  const getAllData = await ibgeRepository.find();

  if (getAllData.length === 0) {
    AllDataMod.forEach(async (element, i) => {
      const ibgeData = ibgeRepository.create({
        id: element.id,
        name: element.nome,
      });
      await ibgeRepository.save(ibgeData);
    });

    const getAllDataFirst = await AppDataSource.getRepository(IBGE).find();

    return {
      status: "Municípios foram criados com sucesso!",
    };
  }

  return { status: "Municípios já foram Criados", municípios: getAllData };
};

export default getMunicipiosServices;
