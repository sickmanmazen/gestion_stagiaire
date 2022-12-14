import NavBarE from "../../componant/NavBarE";
import { fireStore } from "../../auth/Firebase";
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import Footer from "../../componant/Footer";
import { MdOutlineDelete } from "react-icons/md";
const AcceptedDemandeE = () => {

    const [demande, setDemande] = useState([]);
    var timestamp = Date.now();
    console.log(timestamp)

    const getDemande = async () => {
        const q = query(collection(fireStore, "demande"),where("datedefin","<",timestamp));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const result = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setDemande(result);
            });

        });
    }
    const accepter = (id) => {
        updateDoc(doc(fireStore, "demande", id),{statut:"valide"})
    }
    const refuse = (id) => {
        updateDoc(doc(fireStore, "demande", id),{statut:"refuse"})
    }
    const parsedate = (d) => {
        let time = new Date(d*1000)
        return(time.toDateString())
    }
        useEffect(() => {
                getDemande();
            }, [])

    return (
        <>
            <NavBarE />
            <div className="img2">
            <div className="fs-1 fw-bold text-center p-5">
                Les Demandes Acceptées
            </div>
            <Table className="table-bordered">
                <thead>
                    <tr className="text-center bg-dark text-white">
                        <th>#</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Address</th>
                        <th>Code postal</th>
                        <th>E-mail</th>
                        <th>sexe</th>
                        <th>niveau universite</th>
                        <th>Universite</th>
                        <th>Demande</th>
                        <th>Telephone</th>
                        <th>Date de start</th>
                        <th>Date de fin</th>
                        <th>Statut</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>{
                    demande.map((d, index) => {
                            return ( 
                                <tr key={index} className="text-center bg-light text-black" >
                                    <td>{index + 1}</td>
                                    <td>{d.nom}</td>
                                    <td>{d.prenom}</td>
                                    <td>{d.address}</td>
                                    <td>{d.codepostal}</td>
                                    <td>{d.email}</td>
                                    <td>{d.sexe}</td>
                                    <td>{d.niveau}</td>
                                    <td>{d.universite}</td>
                                    <td><Button variant="dark" target={'_blank'} href={d.pdf} size="sm">Link</Button></td>
                                    <td>{d.tel}</td>
                                    <td>{parsedate(d.datedestart)}</td>
                                    <td>{parsedate(d.datedefin)}</td>
                                    <td><Button variant="success" size="sm">{d.statut}</Button></td>
                                    <td><Button variant="danger" size="sm" onClick={() => deleteDoc(doc(fireStore, "demande", d.id))}><MdOutlineDelete  size={25}/></Button></td>
                                </tr>
                            )
                        }
                    )
                }
                </tbody>
            </Table>
            </div>
            <Footer/>
        </>
    )
}
export default AcceptedDemandeE;