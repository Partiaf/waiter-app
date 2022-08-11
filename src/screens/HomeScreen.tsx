import Header from "@/components/Header"
import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react"
// import { QrReader } from 'react-qr-reader'
import QrReader from 'react-qr-reader';
import swal from "sweetalert";
const data = [
    {
        photo: "/user.jpeg",
        username: "jhosermatos25",
        state: true
    },
    {
        photo: "/user2.jpeg",
        username: "carloscuse25",
        state: true
    },
    {
        photo: "/user3.jpeg",
        username: "mariacamila55",
        state: true
    },
    {
        photo: "/user4.webp",
        username: "dayanatorres22",
        state: false
    },
    {
        photo: "/user5.jpeg",
        username: "carolinahumber4",
        state: true
    },
    {
        photo: "/user6.jpg",
        username: "michaelortega981",
        state: false
    }
]

interface Cover {
    peoples: any
}

const HomeScreen = () => {

    const [qrdata, setQrdata] = useState('No result')

    const [orders, setOrders] = useState();

    const [stores, setStores] = useState();
    const [covers, setCovers] = useState<Cover[]>([]);


    const [open, setOpen] = useState(false)

    const store = JSON.parse(localStorage.getItem('storeInfo') || "");

    const getStores = async () => {
        const data = axios.get('https://partiaf-api-recache.herokuapp.com/api/v2/stores').then((response) => {
            setStores(response.data);
            axios.get(`https://partiaf-api-recache.herokuapp.com/api/v2/covers/${store._id}`).then((response) => {
                setCovers(response.data)
                console.log(response.data)
            });
        });
        // setStores(data)
        // console.log(covers)
    }


    useEffect(() => {
        getStores();
    }, [])

    const [text, setText] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam] = useState('');
    const qrRef = useRef<any>(null);

    const handleErrorFile = (error: any) => {
        console.log(error);
    }
    const handleScanFile = (result: any) => {
        if (result) {
            setScanResultFile(result);
        }
    }
    const onScanFile = () => {
        qrRef?.current?.openImageDialog();
    }
    const handleErrorWebCam = (error: any) => {
        console.log(error);
    }
    const handleScanWebCam = (result: any) => {
        if (result) {
            setScanResultWebCam(result);
            const obj = JSON.parse(result); 
            setScanResultWebCam(obj);

            // alert(...obj);
            // alert(`Nombre del Evento: ${obj.eventName} - Nombre del cliente: ${obj.name} - Asistentes: ${obj.people}`);

            swal({
                title: "Acceso Permitido",
                text: `Nombre del Evento: ${obj.eventName} - Nombre del cliente: ${obj.name} - Asistentes: ${obj.people} `, 
                icon: "success"
            });

        }
    }

    return (
        <>
            {/* <Header open={openqr} setOpen={setOpenqr} /> */}

            <header>
                <h2>Partiaf</h2>
                <div>
                    <button onClick={() => setOpen(!open)}><img src="/scan-icon.svg" alt="" /></button>
                    <button></button>
                </div>
            </header>

            {open && (
                <QrReader
                    ref={qrRef}
                    delay={300}
                    style={{ width: '100%' }}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                />
            )}

            
            {/* Scanned Code: {scanResultWebCam} */}


            <h2 className="store-title">{store.name}</h2>
            <h3 className="main-title">Reservas</h3>

            <div className="list-orders">
                {covers[0]?.peoples?.map((order: any) => (
                    <div className="order-card" key={order.username}>
                        <div>
                            <img src="/profile.png" alt="" />
                            <div>
                                <h4>{order.name}</h4>
                                <p>Midnigth, Medellin</p>
                            </div>
                        </div>

                        <div className={order.state == "accepted" ? "success" : "danger"}>

                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default HomeScreen
