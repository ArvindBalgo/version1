<?php
/**
 * Created by PhpStorm.
 * User: Trisha
 * Date: 14/09/2016
 * Time: 22:11
 */

/*CREATE TABLE `commande` (
`Id` int(10) NOT NULL,
  `Date_comm` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `User_id` int(10) NOT NULL,
  `Id_model` varchar(10) NOT NULL,
  `Quantite` int(10) NOT NULL,
  `Date_Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Date modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Unit_price` float NOT NULL,
  `Total` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commande`
--
ALTER TABLE `commande`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT;
*/

class commande {

    //**** Variables declarations ****
    private $_Id = null;
    private $_Date_comm = null;
    private $_User_id = null;
    private $_Id_model = null;
    private $_Quantite = null;
    private $_Date_created = null;
    private $_Date_modified = null;
    private $_Unit_price = null;
    private $_Total = null;


    //**** Constructeur ****
    public function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    private static $SELECT="SELECT * FROM COMMANDE";

    //**** Setters *****
    public function setId($Id) {
        $this->_Id= $Id;
    }

    public function setDate_comm($Date_comm) {
        $this->_Date_comm= $Date_comm;
    }

    public function setUser_id($User_id) {
        $this->_User_id= $User_id;
    }

    public function setId_model($Id_model) {
        $this->_Id_model= $Id_model;
    }

    public function setQuantite($qte) {
        $this->_Quantite= $qte;
    }

    public function setDate_created($Date_created) {
        $this->_Date_created= $Date_created;
    }

    public function setDate_modified($Date_modified) {
        $this->_Date_modified= $Date_modified;
    }

    public function setUnit_price($Unit_price) {
        $this->_Unit_price= $Unit_price;
    }

    public function setTotal($Total) {
        $this->_Total= $Total;
    }

    //**** Getters *****
    public function getId($Id) {
        return $this->_Id;
    }

    public function getDate_comm($Date_comm) {
        return $this->_Date_comm;
    }

    public function getUser_id($User_id) {
        return $this->_User_id;
    }

    public function getId_model($Id_model) {
        return $this->_Id_model;
    }

    public function getQuantite($qte) {
        return $this->_Quantite;
    }

    public function getDate_created($Date_created) {
        return $this->_Date_created;
    }

    public function getDate_modified($Date_modified) {
        return $this->_Date_modified;
    }

    public function getUnit_price($Unit_price) {
        return $this->_Unit_price;
    }

    public function getTotal($Total) {
        return $this->_Total;
    }

    public function delete($Id) {
        $requete = "DELETE FROM COMMANDE WHERE Id=" . $Id ;
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
    }


    //***** fonction de modification/cr�ation *****
    public function save() {
        // $this->_date_filled = date('Y/m/d H:i:s', time());
        if ($this->_Date_created == null) {
            $this->_Date_created= date('Y/m/d H:i:s', time());
        }
        if ($this->_id > 0) {
            $requete = "UPDATE COMMANDE SET Date_comm='" . ($this->_Date_comm) . "'";
            $requete .= ",User_id='" . $this->_User_id . "',";
            $requete .= ",Id_model='" . $this->_Id_model . "',";
            $requete .= ",Quantite='" . $this->_Quantite . "',";
            $requete .= ",Date_created='" . $this->_Date_created . "',";
            $requete .= ",Date_modified='" . $this->_Date_modified . "',";
            $requete .= ",Unit_price='" . $this->_Unit_price . "',";
            $requete .= ",Total='" . $this->_Total . "'";
            $requete .= " WHERE ID=" . $this->_Id;

        } else {
            $requete = "INSERT INTO COMMANDE (";
            $requete .= "ID,";
            $requete .= "Date_comm,";
            $requete .= "User_id,";
            $requete .= "Id_model,";
            $requete .= "Quantite,";
            $requete .= "Date_created,";
            $requete .= "Date_modified,";
            $requete .= "Unit_price,";
            $requete .= "Total";
            $requete .= ") VALUES (";
            $requete .= "'" . $this->_id . "',";
            $requete .= "'" . $this->_Date_comm . "',";
            $requete .= "'" . $this->_User_id . "',";
            $requete .= "'" . $this->_Id_model . "',";
            $requete .= "'" . $this->_Quantite . "',";
			$requete .= "'" . $this->_Date_created . "',";
			$requete .= "'" . $this->_Date_modified . "',";
			$requete .= "'" . $this->_Unit_price . "',";
			$requete .= "'" . $this->_Total . "')";
        }

        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        return $r;
    }



    //***** Fonction de passege sql->objet *****
    private function mapSqlToObject($rs) {
        $comm = new commande();
        $comm->_id = $rs->fields["Id"];
        $comm->_Date_comm = $rs->fields["Date_comm"];
        $comm->_User_id = $rs->fields["User_id"];
        $comm->_Id_model = $rs->fields["Id_model"];
        $comm->_Quantite = $rs->fields["Quantite"];
        $comm->_Date_created = $rs->fields["Date_created"];
        $comm->_Date_modified = $rs->fields["Date_modified"];
        $comm->_Unit_price = $rs->fields["Unit_price"];
        $comm->_Total = $rs->fields["Total"];
        return $comm;
    }

    public function rechercher() { // Recherche de toutes les adresses
        $listcommande = array();
        $requete = self::$SELECT;
        $rs = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        $rows = [];
        while($row = mysqli_fetch_array($rs))
        {
            $rows[] = $row;
        }
        return $rows;
    }

    public function findByPrimaryKey($key) { // Recherche d'une adresse par id
        $requete = self::$SELECT . " WHERE ID=" . $key;
        $rs = $this->conn->query($requete);
        if ($rs->EOF) {
            return null;
        }
        return $this->mapSqlToObject($rs);
    }

} 