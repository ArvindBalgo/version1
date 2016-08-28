<?php
/**
 * Created by PhpStorm.
 * User: Trisha
 * Date: 13/07/2016
 * Time: 22:43
 */
include_once '../chromePHP.php';

class cata_metier {
    //**** Variables declarations ****
    private $_id_cata = null;
    private $_id_metier = null;
    private $_active = null;

   private static $SELECT="SELECT * FROM CATA_METIER";
    //**** Constructeur ****
    public function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    //**** Setters *****
    public function setId_Cata($id_cata) {
        $this->_id_cata= $id_cata;
    }

    public function setId_Metier($id_metier) {
        $this->_id_metier= $id_metier;
    }
    public function setActive($active) {
        $this->_active = $active;
    }
    //**** Getters *****

    public function getId_Cata() {
        return $this->_id_cata;
    }

    public function getIdMetier() {
        return $this->_id_metier;
    }


    public function getActive() {
        return $this->_active;
    }

    public function deleteIdCata($id) {
        $requete = "DELETE FROM CATA_METIER WHERE id_cata=" . $id ;
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
    }


    //***** fonction de modification/cr�ation *****
    public function save() {
            $requete = "INSERT INTO CATA_METIER (";
            $requete .= "ID_CATA,";
            $requete .= "ID_METIER,";
            $requete .= "ACTIVE";
            $requete .= ") VALUES (";
            $requete .= "'" . $this->_id_cata . "',";
            $requete .= "'" . $this->_id_metier . "',";
            $requete .= "'" . $this->_active . "')";
chromePHP::log($requete);
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        return $r;
    }



    //***** Fonction de passege sql->objet *****
    private function mapSqlToObject($rs) {
        $cata_metier = new cata_metier();
        $cata_metier->_id_cata = $rs["id_cata"];
        $cata_metier->_id_metier = $rs["id_metier"];
        $cata_metier->_active = $rs["active"];
        return $cata_metier;
    }

    public function rechercher() { // Recherche de toutes les adresses
        $listLOG =	 array();
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
        $requete = self::$SELECT . " WHERE ID_CATA=" . $key;
        $rs = $this->conn->query($requete);
        if ($rs->EOF) {
            return null;
        }
        return $this->mapSqlToObject(mysqli_fetch_array($rs));
    }
} 