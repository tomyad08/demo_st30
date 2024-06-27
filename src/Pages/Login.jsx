import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const [namaSiswa, setSiswa] = useState("");
  const [noHp, setHp] = useState("");
  const [kelas, setKelas] = useState("");
  const [sekolah, setSekolah] = useState("");

  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    const endSubmit = {
      nama: namaSiswa,
      kelas: kelas,
      sekolah: sekolah,
      no_hp: noHp,
    };

    var formData = new FormData();
    for (var key in endSubmit) {
      if (endSubmit.hasOwnProperty(key)) {
        formData.append(key, endSubmit[key]);
      }
    }

    fetch(
      "https://script.google.com/macros/s/AKfycbw_tSTvfhcifM1YLT-br_9ZdYQP0Et8fy8xThV7mE85_1f3eSGsKJ50xgkMaSwiXlWd/exec",
      {
        method: "POST",
        body: formData,
      }
    ).then(() => {
      navigate("/test-minat-bakat");
    });
  };
  return (
    <div className="bg-yellow-200 h-screen flex justify-center items-center">
      <div className="w-4/5 bg-amber-600 p-5 rounded-xl">
        <form>
          <label className="text-sm text-white">Nama Siswa</label>
          <input
            className="p-2 xl:p-1 w-full bg-white rounded-lg focus:font-semibold mb-3 outline-none"
            type="text"
            onChange={(e) => setSiswa(e.target.value)}
          />
          <label className="text-sm text-white">No_HP</label>
          <input
            className="p-2 xl:p-1 w-full bg-white rounded-lg mb-5 outline-none"
            type="number"
            onChange={(e) => setHp(e.target.value)}
          />
          <label className="text-sm text-white">Kelas</label>
          <input
            className="p-2 xl:p-1 w-full bg-white rounded-lg mb-5 outline-none"
            type="number"
            onChange={(e) => setKelas(e.target.value)}
          />
          <label className="text-sm text-white">Asal Sekolah</label>
          <input
            className="p-2 xl:p-1 w-full bg-white rounded-lg mb-5 outline-none"
            type="text"
            onChange={(e) => setSekolah(e.target.value)}
          />
          <button
            className="p-2 w-full bg-red-600 border border-2 border-white rounded-lg font-semibold text-white"
            onClick={HandleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default FormLogin;
