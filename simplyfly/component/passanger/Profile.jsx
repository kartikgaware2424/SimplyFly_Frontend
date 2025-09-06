import React, { useEffect, useState } from "react";
import axios from "axios";
import UserService from "../../Service/UserService";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                if (!token) return setMsg("❌ Token not found!");

             
                const base64Url = token.split(".")[1];
                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                const payload = JSON.parse(atob(base64));

                const email = payload.sub;
                if (!email) return setMsg("❌ Email not found in token!");

                // const res = await axios.get(
                //     `http://localhost:8080/api/users/getUserByEmail/${email}`,
                //     { headers: { Authorization: `Bearer ${token}` } }
                // );
                const res=await UserService.getUserByEmail(email,token);

                setUser(res.data);
            } catch (err) {
                console.error(err);
                setMsg("❌ Error fetching user details!");
            }
        };

        fetchUser();
    }, []);

    if (msg) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <p className="text-danger h5">{msg}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <p className="text-primary h5">⏳ Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg border-0 rounded-3" style={{ maxWidth: "600px", width: "100%" }}>
                <div className="card-header text-center bg-primary text-white">
                    <h3 className="mb-0">👤 User Profile</h3>
                </div>
                <div className="card-body p-4">
                    <table className="table table-hover table-bordered text-center">
                        <tbody>
                            <tr>
                                <th className="bg-light">🧑 Name</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th className="bg-light">📧 Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th className="bg-light">📞 Contact</th>
                                <td>{user.contactNumber}</td>
                            </tr>
                            <tr>
                                <th className="bg-light">⚧ Gender</th>
                                <td>{user.gender}</td>
                            </tr>
                            <tr>
                                <th className="bg-light">🎂 Age</th>
                                <td>{user.age}</td>
                            </tr>
                            <tr>
                                <th className="bg-light">🏠 Address</th>
                                <td>{user.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
