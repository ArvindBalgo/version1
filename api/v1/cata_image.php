<?php
/**
 * Created by PhpStorm.
 * User: Trisha
 * Date: 13/07/2016
 * Time: 22:43
 */

class cata_image {
    //**** Variables declarations ****
    private $_id = null;
    private $_id_category = null;
    private $_libelle = null;
    private $_src = null;
    private $_reference = null;
    private $_active = null;

   private static $SELECT="SELECT * FROM CATA_IMAGE";
    //**** Constructeur ****
    public function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    //**** Setters *****
    public function setId($id) {
        $this->_id= $id;
    }

    public function setIdCategory($id) {
        $this->_id_category= $id;
    }

    public function setLibelle($libelle) {
        $this->_libelle= $libelle;
    }
    public function setSrc($src) {
        $this->_src= $src;
    }

    public function setReference($ref) {
        $this->_reference= $ref;
    }
    public function setActive($active) {
        $this->_active= $active;
    }

    //**** Getters *****

    public function getId() {
        return $this->_id;
    }

    public function getIdCategory() {
        return $this->_id_category;
    }

    public function getLibelle() {
        return $this->_libelle;
    }


    public function getSrc() {
        return $this->_src;
    }

    public function getReference() {
        return $this->_reference;
    }

    public function getActive() {
        return $this->_active;
    }

    public function delete($id) {
        $requete = "DELETE FROM CATA_IMAGE WHERE id=" . $id ;
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
    }


    //***** fonction de modification/cr�ation *****
    public function save() {

        if ($this->_id > 0) {
            $requete = "UPDATE CATA_IMAGE SET LIBELLE='" . ($this->_libelle) . "'";
            $requete .= ",ID_CATEGORY='" . $this->_id_category . "'";
            $requete .= ",SRC='" . $this->_src . "'";
            $requete .= ",REFERENCE='" . $this->_reference . "'";
            $requete .= ",ACTIVE=" . $this->_active;
            $requete .= " WHERE ID=" . $this->_id;

        } else {
            $requete = "INSERT INTO CATA_IMAGE (";
            $requete .= "LIBELLE,";
            $requete .= "SRC,";
            $requete .= "REFERENCE,";
            $requete .= "ID_CATEGORY,";
            $requete .= "ACTIVE";
            $requete .= ") VALUES (";
            $requete .= "'" . $this->_libelle . "',";
            $requete .= "'" . $this->_src . "',";
            $requete .= "'" . $this->_reference . "',";
            $requete .= "'" . $this->_id_category . "',";
            $requete .= "'" . $this->_active . "')";
        }
        chromePHP::log($requete);
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        return $r;
    }



    //***** Fonction de passege sql->objet *****
    private function mapSqlToObject($rs) {
        $cata_image = new cata_image();
        $cata_image->_id = $rs["id"];
        $cata_image->_id_category = $rs["id_category"];
        $cata_image->_libelle = $rs["libelle"];
        $cata_image->_src = $rs["src"];
        $cata_image->_reference = $rs["reference"];
        $cata_image->_active = $rs["active"];
        return $cata_image;
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

        return $this->mapSqlToObject(mysqli_fetch_array($rs));
    }
} 