import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Result from "./Result";

const AnalisisST30 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Data, setData] = useState("");
  const [bakatValue, setBakatValue] = useState("");

  let bakatValues = {
    Networking: 0,
    Headman: 0,
    GeneratingIdea: 0,
    Serving: 0,
    Technical: 0,
    Thinking: 0,
    Reasoning: 0,
    Elementer: 0,
  };

  const levelChanges = {
    "PALING TIDAK DISUKAI": -25,
    "TIDAK DISUKAI": -13,
    DISUKAI: 13,
    "PALING DISUKAI": 25,
  };

  const specialCases = {
    Headman: {
      "PALING TIDAK DISUKAI": -20,
      "TIDAK DISUKAI": -10,
      DISUKAI: 10,
      "PALING DISUKAI": 20,
    },
    Serving: {
      "PALING TIDAK DISUKAI": -50,
      "TIDAK DISUKAI": -25,
      DISUKAI: 25,
      "PALING DISUKAI": 50,
    },
    GeneratingIdea: {
      "PALING TIDAK DISUKAI": -17,
      "TIDAK DISUKAI": -9,
      DISUKAI: 9,
      "PALING DISUKAI": 17,
    },
    Technical: {
      "PALING TIDAK DISUKAI": -20,
      "TIDAK DISUKAI": -10,
      DISUKAI: 20,
      "PALING DISUKAI": 20,
    },
    Elementer: {
      "PALING TIDAK DISUKAI": -34,
      "TIDAK DISUKAI": -17,
      DISUKAI: 17,
      "PALING DISUKAI": 34,
    },
    Reasoning: {
      "PALING TIDAK DISUKAI": -34,
      "TIDAK DISUKAI": -17,
      DISUKAI: 17,
      "PALING DISUKAI": 34,
    },
    Thinking: {
      "PALING TIDAK DISUKAI": -50,
      "TIDAK DISUKAI": -25,
      DISUKAI: 25,
      "PALING DISUKAI": 50,
    },
  };

  const Persentase = (bakat, level) => {
    if (!bakatValues.hasOwnProperty(bakat)) {
      console.error(`Unknown bakat: ${bakat}`);
      return;
    }
    let change = levelChanges[level];
    if (specialCases[bakat] && specialCases[bakat][level] !== undefined) {
      change = specialCases[bakat][level];
    }
    bakatValues[bakat] += change / 2;
    setBakatValue(bakatValues);
  };

  const handleFilter = (x) => {
    let container = [];
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < location.state.length; j++) {
        if (location.state[j].minat === x[i].minat) {
          Persentase(x[i].group, location.state[j].head);
          container.push(x[i]);
        }
      }
    }
    setData(container);
  };

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbwB_pJ9MdVbjktiX4s59uBETieEVsrE9kYsXFxkYcopudp3g-WPAEIqmiKSUSwNvRu7uw/exec",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        handleFilter(data);
      });
  }, []);

  const RelativeBakat = [
    {
      id: 1,
      name: "Networking",
      description:
        "Aktivitas berinteraksi dengan orang lain dalam rangka bekerja sama, membimbing, melatih, atau mewakili.",
    },
    {
      id: 2,
      name: "Headman",
      description:
        "Aktivitas berinteraksi dengan orang lain dalam rangka mengendalikan, mempengaruhi, atau mengawasi.",
    },
    {
      id: 3,
      name: "Serving",
      description:
        "Aktivitas berinteraksi dengan orang lain dalam rangka merawat, melayani, atau menolong.",
    },
    {
      id: 4,
      name: "GeneratingIdea",
      description:
        "Aktivitas individual menggunakan pemikiran terkait intuisi, ide, dan kreativitas.",
    },
    {
      id: 5,
      name: "Technical",
      description:
        "Aktivitas individual yang tidak banyak menggunakan olah pikir, namun memerlukan ketekunan, kegigihan, dan biasanya berada di luar ruangan.",
    },
    {
      id: 6,
      name: "Elementer",
      description:
        "Aktivitas individual yang tidak banyak menggunakan olah pikir, namun memerlukan ketekunan, kegigihan, dan biasanya berada di luar ruangan.",
    },
    {
      id: 7,
      name: "Reasoning",
      description:
        "Aktivitas individual yang menggunakan logika untuk mencari atau membuktikan sesuatu",
    },
    {
      id: 8,
      name: "Thinking",
      description:
        "Aktivitas individual menggunakan logika, fakta, atau terkait analisa terhadap angka maupun data.",
    },
  ];
  return (
    <div className="p-5 bg-amber-100">
      <h1 className="text-center text-white font-semibold text-3xl p-5 bg-yellow-700 rounded-xl">
        Analisis Stength Typology 30
      </h1>
      <p className="text-justify my-5" style={{ fontSize: "12px" }}>
        Strength Typologi 30 adalah sebuah metode pemetaan minat dan bakat yang
        bertujuan untuk membantu individu menemukan peran yang paling produktif
        dan sesuai dengan potensi mereka.
      </p>
      <div className="h-96 overflow-y-scroll rounded-xl mb-5">
        <Result />
      </div>
      <div>
        <table>
          <thead>
            <tr className="border-b-2 p-2 border-black-300 text-center">
              <th className="p-1 " style={{ fontSize: "10px" }}>
                Aktivitas
              </th>
              <th className="p-1 " style={{ fontSize: "10px" }}>
                Presentase
              </th>
              <th className="p-1 " style={{ fontSize: "10px" }}>
                Deskripsi
              </th>
            </tr>
          </thead>
          <tbody>
            {RelativeBakat.map((value) => (
              <tr className="border-b-2 border-black-300 text-center">
                <td className="p-1" style={{ fontSize: "10px" }}>
                  {value.name}
                </td>
                <td className="p-1" style={{ fontSize: "10px" }}>
                  {bakatValue[value.name]}
                </td>
                <td className="p-1" style={{ fontSize: "10px" }}>
                  {value.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="text-justify mt-5" style={{ fontSize: "12px" }}>
          Berikut adalah data berdasarkan pengelompokkan peran yang paling
          produktif dan paling tidak produktif.
        </h1>
      </div>
      <div className="my-5">
        <h1 className="text-black text-sm border-b-2 border-black">
          Peran Paling Produktif
        </h1>
        <div className="columns-2 mt-3">
          {location.state
            .filter((value) => value.head === "PALING DISUKAI")
            .map((value, index) => (
              <div
                key={index}
                className="p-1 bg-yellow-700 text-white font-semibold text-center text-sm mb-2 rounded-lg"
              >
                {value.minat}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-black text-sm border-b-2 border-black">
          Peran Paling Tidak Produktif
        </h1>
        <div className="columns-2 mt-3">
          {location.state
            .filter((value) => value.head === "PALING TIDAK DISUKAI")
            .map((value, index) => (
              <div
                key={index}
                className="p-1 bg-yellow-700 text-white font-semibold text-center text-sm mb-2 rounded-lg"
              >
                {value.minat}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-5">
        {Data ? (
          <>
            {Data.map((value) => (
              <div className="my-1">
                <h1 className="text-sm font-bold text-black">{value.minat}</h1>
                <p className="text-justify" style={{ fontSize: "10px" }}>
                  {value.description}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className="p-2 w-3/4 bg-red-500 rounded-xl text-white"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
export default AnalisisST30;
