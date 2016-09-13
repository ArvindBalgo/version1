<?php
class modelmetier{

    //**** D�claration des variables ****
    private $_id            = null;
    private $_description   = null;
    private $_category      = null;
    private $_src           = null;
    private $_qte           = null;
    private $_active        = null;

    private static $SELECT = "SELECT * FROM MODELMETIER";

    //**** Constructeur ****
    private $conn;

    function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    //**** D�claration des setters *****
    public function setId($id) {
        $this->_id = $id;
    }

    public function setDescription($libelle) {
        $this->_description = $libelle;
    }

    public function setCategory($category) {
        $this->_category = $category;
    }

    public function setSrc($src) {
        $this->_src = $src;
    }

    public function setQte($qte){
        $this->_qte = $qte;
    }
    public function setActive($active){
        $this->_active = $active;
    }

    //**** D�claration des getters ****
    public function getId() {
        return $this->_id;
    }

    public function getDescription() {
        return $this->_description;
    }

    public function getCategory() {
        return $this->_category;
    }

    public function getSrc() {
        return $this->_src;
    }

    public function getQte() {
        return $this->_qte;
    }

    public function getActive() {
        return $this->_active;
    }
    //**** Fonction de suppression ****
    public function delete($id) {
        $requete = "DELETE FROM MODELMETIER WHERE ID=" . $id;
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
    }

    //***** fonction de modification/cr�ation *****
    public function save() {
        $this->_date_modified = date('Y/m/d H:i:s', time());
        if ($this->_date_created == null) {
            $this->_date_created = date('Y/m/d H:i:s', time());
        }
        if ($this->_id > 0) {
            $requete = "UPDATE MODELMETIER SET DESCRIPTION='" . ($this->_description) . "'";
            $requete .= ",CATEGORY='" . $this->_category . "'";
            $requete .= ",SRC='" . $this->_src."'";
            $requete .= ",QTE='" . $this->_qte."'";
            $requete .= ",ACTIVE=" . $this->_active;
            $requete .= " WHERE ID=" . $this->_id;

        } else {
            $requete = "INSERT INTO MODELMETIER (";
            $requete .= "DESCRIPTION,";
            $requete .= "CATEGORY,";
            $requete .= "SRC,";
            $requete .= "QTE,";
            $requete .= "ACTIVE";
            $requete .= ") VALUES (";
            $requete .= "'" . $this->_description . "',";
            $requete .= "'" . $this->_category . "',";
            $requete .= "'" . $this->_src . "',";
            $requete .= "'" . $this->_qte . "',";
            $requete .= "'" . $this->_active . "')";
        }
chromePHP::log($requete);
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        return $r;
    }


    //***** Fonction de passege sql->objet *****
    private function mapSqlToObject($rs) {
        $metier = new modelmetier();
        $metier->_id = $rs["id"];
        $metier->_description = $rs["description"];
        $metier->_category = $rs["category"];
        $metier->_qte = $rs["qte"];
        $metier->_src = $rs["src"];
        $metier->_active = $rs["active"];
        return $metier;
    }

    public function rechercher() { // Recherche de toutes

        $listMetier = array();
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
}