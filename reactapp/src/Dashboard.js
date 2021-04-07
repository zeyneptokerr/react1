import React from 'react';
import Login from "./Login";
import AddUser from "./AddUser";

function Dashboard(props) {



  return (
    <div>
      <AddUser title="Kayıt Ol" />
      <Login title="Giriş Yap" />
    </div>
  );
}

export default Dashboard;