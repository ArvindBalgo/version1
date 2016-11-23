<?php

class cata_dimension {
    //**** Variables declarations ****
    private $_id = null;
    private $_id_subcategory = null;
    private $_dimension = "";
    private $_coeff = null;

   private static $SELECT="SELECT * FROM cata_dimension";
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

    public function setIdSubCategory($id) {
        $this->_id_subcategory= $id;
    }

    public function setDimension($dimension) {
        $this->_dimension= $dimension;
    }
    public function setCoeff($coeff) {
        $this->_coeff= $coeff;
    }

    //**** Getters *****

    public function getId() {
        return $this->_id;
    }

    public function getIdSubCategory() {
        return $this->_id_subcategory;
    }

    public function getDimension() {
        return $this->_dimension;
    }


    public function getCoeff() {
        return $this->_coeff;
    }

    public function delete($id) {
        $requete = "DELETE FROM cata_dimension WHERE id=" . $id ;
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
    }

    //***** fonction de modification/cr�ation *****
    public function save() {

        if ($this->_id > 0) {
            $requete = "UPDATE cata_dimension SET id_sub_category='" . ($this->_id_subcategory) . "'";
            $requete .= ",dimension='" . $this->_dimension . "'";
            $requete .= ",coeff='" . $this->_coeff . "'";
            $requete .= " WHERE id=" . $this->_id;

        } else {
            $requete = "INSERT INTO cata_dimension (";
            $requete .= "id_sub_category,";
            $requete .= "dimension,";
            $requete .= "coeff";
            $requete .= ") VALUES (";
            $requete .= "'" . $this->_id_subcategory . "',";
            $requete .= "'" . $this->_dimension . "',";
            $requete .= "'" . $this->_coeff . "')";
        }
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        return $r;
    }



    //***** Fonction de passege sql->objet *****
    private function mapSqlToObject($rs) {
        $cata_dimension = new cata_dimension();
        $cata_dimension->_id = $rs["id"];
        $cata_dimension->_id_subcategory = $rs["id_sub_category"];
        $cata_dimension->_dimension = $rs["dimension"];
        $cata_dimension->_coeff = $rs["coeff"];
        return $cata_dimension;
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
        $requete = self::$SELECT . " WHERE id=" . $key;
        $rs = $this->conn->query($requete);

        return $this->mapSqlToObject(mysqli_fetch_array($rs));
    }

    public function findBySubCatDim ($scategory , $dimension){
        $requete = "select count(*) as count from cata_dimension where id_sub_category = ".$scategory . " and dimension='".$dimension."'";
        $rs = $this->conn->query($requete);
        $result = mysqli_fetch_array($rs);
        return $result["count"];
    }

    public function findByIDSCategory($category){
        $requete = self::$SELECT." where id_sub_category=".$category;
        $rs = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        $rows = array();
        while($row = mysqli_fetch_array($rs))
        {
            $rows[] = $row;
        }
        return $rows;
    }
} 