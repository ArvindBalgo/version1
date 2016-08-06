<?php
class modelmetier{

    //**** D�claration des variables ****
    private $_id            = null;
    private $_description   = null;
    private $_category      = null;
    private $_src           = null;

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
            $requete .= ",SRC=" . $this->_src;
            $requete .= " WHERE ID=" . $this->_id;

        } else {
            $requete = "INSERT INTO MODELMETIER (";
            $requete .= "DESCRIPTION,";
            $requete .= "CATEGORY,";
            $requete .= "SRC";
            $requete .= ") VALUES (";
            $requete .= "'" . $this->_description . "',";
            $requete .= "'" . $this->_category . "',";
            $requete .= "'" . $this->_src . "')";
        }

        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        return $r;
    }


    //***** Fonction de passege sql->objet *****
    private function mapSqlToObject($rs) {
        $metier = new modelmetier();
        $metier->_id = $rs->fields["ID"];
        $metier->_description = $rs->fields["DESCRIPTION"];
        $metier->_category = $rs->fields["CATEGORY"];
        $metier->_src = $rs->fields["SRC"];
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
        return $this->mapSqlToObject($rs);
    }
}