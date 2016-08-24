<?php
/**
 * Created by PhpStorm.
 * User: Trisha
 * Date: 13/07/2016
 * Time: 22:43
 */
include_once '../chromePHP.php';

class cata {
    //**** Variables declarations ****
    private $_id_cata = null;
    private $_libelle = null;
    private $_description = null;
    private $_src = null;
    private $_id_front = null;
    private $_id_back = null;
    private $_reference = null;
    private $_date_created = null;
    private $_date_modified = null;
    private $_created_by = null;
    private $_modified_by = null;

   private static $SELECT="SELECT * FROM CATA";
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

    public function setLibelle($libelle) {
        $this->_libelle= $libelle;
    }
    public function setDescription($description) {
        $this->_description= $description;
    }
    public function setSrc($src) {
        $this->_src= $src;
    }

    public function setIdFront($id_front) {
        $this->_id_front= $id_front;
    }
    public function setIdBack($id_back) {
        $this->_id_back= $id_back;
    }
    public function setReference($ref) {
        $this->_reference= $ref;
    }
    public function setCreatedBy($user) {
        $this->_created_by= $user;
    }
    public function setModifiedBy($user) {
        $this->_modified_by= $user;
    }

    //**** Getters *****

    public function getId_Cata() {
        return $this->_id_cata;
    }

    public function getLibelle() {
        return $this->_libelle;
    }


    public function getDescription() {
        return $this->_description;
    }


    public function getSrc() {
        return $this->_src;
    }

    public function getIdFront() {
        return $this->_id_front;
    }

    public function getIdBack() {
        return $this->_id_back;
    }

    public function getReference() {
        return $this->_reference;
    }

    public function getDateCreated() {
        return $this->_date_created;
    }


    public function getDateModified() {
        return $this->_date_modified;
    }


    public function getCreatedBy() {
        return $this->_created_by;
    }

    public function getModifiedBy() {
        return $this->_modified_by;
    }

    public function delete($id) {
        $requete = "DELETE FROM CATA WHERE id=" . $id ;
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
    }


    //***** fonction de modification/cr�ation *****
    public function save() {
        // $this->_date_modified = date('Y/m/d H:i:s', time());
        if ($this->_date_created == null) {
            $this->_date_created = date('Y/m/d H:i:s', time());
        }
        if ($this->_date_modified == null) {
            $this->_date_modified = date('Y/m/d H:i:s', time());
        }

        if ($this->_id_cata > 0) {
            $requete = "UPDATE CATA SET LIBELLE='" . ($this->_libelle) . "'";
            $requete .= ",DESCRIPTION='" . $this->_description . "'";
            $requete .= ",SRC='" . $this->_src . "'";
            $requete .= ",ID_FRONT='" . $this->_id_front . "'";
            $requete .= ",ID_BACK='" . $this->_id_back . "'";
            $requete .= ",REFERENCE='" . $this->_reference . "'";
            $requete .= ",DATE_CREATED='" . $this->_date_created . "'";
            $requete .= ",DATE_MODIFIED='" . $this->_date_modified . "'";
            $requete .= ",CREATED_BY='" . $this->_created_by . "'";
            $requete .= ",MODIFIED_BY='" . $this->_modified_by . "'";
            $requete .= " WHERE ID=" . $this->_id_cata;

        } else {
            $requete = "INSERT INTO CATA (";
            $requete .= "LIBELLE,";
            $requete .= "DESCRIPTION,";
            $requete .= "SRC,";
            $requete .= "ID_FRONT,";
            $requete .= "ID_BACK,";
            $requete .= "REFERENCE,";
            $requete .= "DATE_CREATED,";
            $requete .= "DATE_MODIFIED,";
            $requete .= "CREATED_BY,";
            $requete .= "MODIFIED_BY";
            $requete .= ") VALUES (";
            $requete .= "'" . $this->_libelle . "',";
            $requete .= "'" . $this->_description . "',";
            $requete .= "'" . $this->_src . "',";
            $requete .= "'" . $this->_id_front . "',";
            $requete .= "'" . $this->_id_back . "',";
            $requete .= "'" . $this->_reference . "',";
            $requete .= "'" . $this->_date_created . "',";
            $requete .= "'" . $this->_date_modified . "',";
            $requete .= "'" . $this->_created_by . "',";
            $requete .= "'" . $this->_modified_by . "')";
        }
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        return $r;
    }



    //***** Fonction de passege sql->objet *****
    private function mapSqlToObject($rs) {
        $cata = new cata();
        $cata->_id_cata = $rs["id"];
        $cata->_libelle = $rs["libelle"];
        $cata->_description = $rs["description"];
        $cata->_src = $rs["src"];
        $cata->_id_front = $rs["id_front"];
        $cata->_id_back = $rs["id_back"];
        $cata->_reference = $rs["reference"];
        $cata->_date_created = $rs["date_created"];
        $cata->_date_modified = $rs["date_modified"];
        $cata->_created_by = $rs["created_by"];
        $cata->_modified_by = $rs["modified_by"];
        return $cata;
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
        $requete = self::$SELECT . " WHERE ID=" . $key;
        $rs = $this->conn->query($requete);
        if ($rs->EOF) {
            return null;
        }
        return $this->mapSqlToObject(mysqli_fetch_array($rs));
    }

    public function getLastId(){
        $requete = "SELECT MAX(ID) AS ID FROM CATA";
        $rs = $this->conn->query($requete);
        $result = mysqli_fetch_array($rs);
        return $result["ID"];
    }
} 