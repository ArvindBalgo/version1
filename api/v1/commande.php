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
    private $_id = null;
    private $_date_comm = null;
    private $_user_id = null;
    private $_id_model = null;
    private $_quantite = null;
    private $_date_created = null;
    private $_date_modified = null;
    private $_unit_price = null;
    private $_total = null;


    //**** Constructeur ****
    public function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    private static $SELECT="SELECT * FROM commande";

    //**** Setters *****
    public function setId($Id) {
        $this->_id= $Id;
    }

    public function setDate_comm($Date_comm) {
        $this->_date_comm= $Date_comm;
    }

    public function setUser_id($User_id) {
        $this->_user_id= $User_id;
    }

    public function setId_model($Id_model) {
        $this->_id_model= $Id_model;
    }

    public function setQuantite($qte) {
        $this->_quantite= $qte;
    }

    public function setDate_created($Date_created) {
        $this->_date_created= $Date_created;
    }

    public function setDate_modified($Date_modified) {
        $this->_date_modified= $Date_modified;
    }

    public function setUnit_price($Unit_price) {
        $this->_unit_price= $Unit_price;
    }

    public function setTotal($Total) {
        $this->_total= $Total;
    }

    //**** Getters *****
    public function getId($Id) {
        return $this->_id;
    }

    public function getDate_comm($Date_comm) {
        return $this->_date_comm;
    }

    public function getUser_id($User_id) {
        return $this->_user_id;
    }

    public function getId_model($Id_model) {
        return $this->_id_model;
    }

    public function getQuantite($qte) {
        return $this->_quantite;
    }

    public function getDate_created($Date_created) {
        return $this->_date_created;
    }

    public function getDate_modified($Date_modified) {
        return $this->_date_modified;
    }

    public function getUnit_price($Unit_price) {
        return $this->_unit_price;
    }

    public function getTotal($Total) {
        return $this->_total;
    }

    public function delete($Id) {
        $requete = "DELETE FROM commande WHERE id=" . $Id ;
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
    }


    //***** fonction de modification/cr�ation *****
    public function save() {
        // $this->_date_filled = date('Y/m/d H:i:s', time());
        if ($this->_Date_created == null) {
            $this->_Date_created= date('Y/m/d H:i:s', time());
        }
        if ($this->_id > 0) {
            $requete = "UPDATE commande SET date_comm='" . ($this->_Date_comm) . "'";
            $requete .= ",user_id='" . $this->_User_id . "',";
            $requete .= ",id_model='" . $this->_Id_model . "',";
            $requete .= ",quantite='" . $this->_Quantite . "',";
            $requete .= ",date_created='" . $this->_Date_created . "',";
            $requete .= ",date_modified='" . $this->_Date_modified . "',";
            $requete .= ",unit_price='" . $this->_Unit_price . "',";
            $requete .= ",total='" . $this->_Total . "'";
            $requete .= " WHERE id=" . $this->_Id;

        } else {
            $requete = "INSERT INTO commande (";
            $requete .= "id,";
            $requete .= "date_comm,";
            $requete .= "user_id,";
            $requete .= "id_model,";
            $requete .= "quantite,";
            $requete .= "date_created,";
            $requete .= "date_modified,";
            $requete .= "unit_price,";
            $requete .= "total";
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
        $comm->_id = $rs->fields["id"];
        $comm->_date_comm = $rs->fields["date_comm"];
        $comm->_user_id = $rs->fields["user_id"];
        $comm->_id_model = $rs->fields["id_model"];
        $comm->_quantite = $rs->fields["quantite"];
        $comm->_date_created = $rs->fields["date_created"];
        $comm->_date_modified = $rs->fields["date_modified"];
        $comm->_unit_price = $rs->fields["unit_price"];
        $comm->_total = $rs->fields["total"];
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
        $requete = self::$SELECT . " WHERE id=" . $key;
        $rs = $this->conn->query($requete);
        if ($rs->EOF) {
            return null;
        }
        return $this->mapSqlToObject($rs);
    }

} 