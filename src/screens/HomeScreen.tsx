import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
// import { QrReader } from 'react-qr-reader'
import QrReader from "react-qr-reader";
import swal from "sweetalert";
const data = [
  {
    photo: "/user.jpeg",
    username: "jhosermatos25",
    state: true,
  },
  {
    photo: "/user2.jpeg",
    username: "carloscuse25",
    state: true,
  },
  {
    photo: "/user3.jpeg",
    username: "mariacamila55",
    state: true,
  },
  {
    photo: "/user4.webp",
    username: "dayanatorres22",
    state: false,
  },
  {
    photo: "/user5.jpeg",
    username: "carolinahumber4",
    state: true,
  },
  {
    photo: "/user6.jpg",
    username: "michaelortega981",
    state: false,
  },
];

interface Cover {
  peoples: any;
}

const HomeScreen = () => {
  const [qrdata, setQrdata] = useState("No result");

  const [orders, setOrders] = useState();

  const [stores, setStores] = useState();
  const [covers, setCovers] = useState<Cover[]>([]);

  const [open, setOpen] = useState(false);

  const store = JSON.parse(localStorage.getItem("storeInfo") || "");

  const getStores = async () => {
    const data = axios
      .get("https://partiaf-api-recache.herokuapp.com/api/v2/stores")
      .then((response) => {
        setStores(response.data);
        axios
          .get(
            `https://partiaf-api-recache.herokuapp.com/api/v2/covers/${store._id}`
          )
          .then((response) => {
            setCovers(response.data);
            console.log(response.data);
          });
      });
    // setStores(data)
    // console.log(covers)
  };

  console.log(covers);
  useEffect(() => {
    getStores();
  }, []);

  const [text, setText] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrRef = useRef<any>(null);

  const handleErrorFile = (error: any) => {
    console.log(error);
  };
  const handleScanFile = (result: any) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef?.current?.openImageDialog();
  };
  const handleErrorWebCam = (error: any) => {
    console.log(error);
  };
  const handleScanWebCam = (result: any) => {
    if (result) {
      setScanResultWebCam(result);
      const obj = JSON.parse(result);
      setScanResultWebCam(obj);
      if (!obj.name) {
        swal({
          title: "QR no valido",
          text: `Intenta de nuevo o verifica que estas en la aplicacion correcta `,
          icon: "error",
        });
      } else if (obj.name && obj.state == "accepted") {
        sendRequest(obj.user, obj.id);
        swal({
          title: "Acceso Permitido",
          text: `Nombre del Evento: ${obj.name} - Asistentes: ${obj.amount} - Precio: ${obj.price} - Hora: ${obj.hour} `,
          icon: "success",
        });
      } else {
        swal({
          title: "Acceso Denegado",
          text: `El QR ya ha sido usado `,
          icon: "warning",
        });
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [coverView, setCoverView] = useState("");
  const [updateScreen, setUpdateScreen] = useState(false);

  const sendRequest = async (userId: string, coverId: string) => {
    setLoading(true);
    axios
      .post("https://partiaf-api-recache.herokuapp.com/api/v2/update-user", {
        userId,
        coverId,
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (updateScreen) {
      setUpdateScreen(false);
    }
  }, []);

  return (
    <>
      {/* <Header open={openqr} setOpen={setOpenqr} /> */}

      <header>
        <img src="/logo-partiaf-secondary.svg" />
        <div>
          <button onClick={() => setOpen(!open)}>
            <img src="/scan-icon.svg" alt="" />
          </button>
          <button></button>
        </div>
      </header>

      {open && (
        <QrReader
          ref={qrRef}
          delay={300}
          style={{ width: "100%", color: "#EBC74E" }}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
        />
      )}

      {/* Scanned Code: {scanResultWebCam} */}

      <h2 className="store-title">{store.name}</h2>
      <h3 className="main-title">Seleccionar evento</h3>
      <div className="select-event-container">
        <select name="" id="" className="select-event" onChange={({target}) => setCoverView(target.value)}>
        <option value="">Todo</option>
            {covers.map((cover:any) => (
                <option value={cover.name}>{cover.name}</option>
            ))}
        </select>
      </div>

      <h3 className="main-title">Covers</h3>

      <div className="list-orders">
        {covers.filter((cover:any) => cover.name.includes(coverView) ).map((cover:any) =>
          cover?.peoples?.map((order: any) => (
            <div className="order-card" key={order.username}>
              <div>
                <img src="/profile.png" alt="" />
                <div>
                  <h4>{order.name}</h4>
                  <p>{cover.name}</p>
                </div>
              </div>

              <div
                className={order.state == "accepted" ? "success" : "danger"}
              ></div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HomeScreen;
