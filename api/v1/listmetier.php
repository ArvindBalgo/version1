<?php
class listmetier{

    //**** D�claration des variables ****
    private $_id            = null;
    private $_libelle       = null;
    private $_sub_libelle   = null;
    private $_active        = null;
    private $_date_created  = null;
    private $_date_modified = null;

    private static $SELECT = "SELECT * FROM LISTMETIER";

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

    public function setLibelle($libelle) {
        $this->_libelle = $libelle;
    }

    public function setSubLibelle($subLibelle) {
        $this->_sub_libelle = $subLibelle;
    }

    public function setActive($active) {
        $this->_active = $active;
    }

    public function setDateCreated($dateCreated) {
        $this->_date_created = $dateCreated;
    }

    public function setDateModified($dateModified) {
        $this->_date_modified = $dateModified;
    }


    //**** D�claration des getters ****
    public function getId() {
        return $this->_id;
    }

    public function getLibelle() {
        return $this->_libelle;
    }

    public function getSubLibelle() {
        return $this->_sub_libelle;
    }

    public function getActive() {
        return $this->_active;
    }

    public function getDateCreated() {
        return $this->_date_created;
    }

    public function getDateModified() {
        return $this->_date_modified;
    }

    //**** Fonction de suppression ****
    public function delete($id) {
        $requete = "DELETE FROM LISTMETIER WHERE ID=" . $id;
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
    }

    //***** fonction de modification/cr�ation *****
    public function save() {
        $this->_date_modified = date('Y/m/d H:i:s', time());
       // if ($this->_date_created == null) {
            $this->_date_created = date('Y/m/d H:i:s', time());
      //  }
        chromePHP::log($this->_id .  "    :::" );
        if ($this->_id > 0) {
            $requete = "UPDATE LISTMETIER SET LIBELLE='" . ($this->_libelle) . "'";
            $requete .= ",SUB_LIBELLE='" . $this->_sub_libelle . "'";
            $requete .= ",ACTIVE=" . $this->_active;
            $requete .= ",DATE_CREATED='" . $this->_date_created . "'";
            $requete .= ",DATE_MODIFIED='" . $this->_date_modified . "'";
            $requete .= " WHERE ID=" . $this->_id;

        } else {
            $requete = "INSERT INTO LISTMETIER (";
            $requete .= "LIBELLE,";
            $requete .= "SUB_LIBELLE,";
            $requete .= "ACTIVE,";
            $requete .= "DATE_CREATED,";
            $requete .= "DATE_MODIFIED";
            $requete .= ") VALUES (";
            $requete .= "'" . $this->_libelle . "',";
            $requete .= "'" . $this->_sub_libelle . "',";
            $requete .= $this->_active . ",";
            $requete .= "'" . $this->_date_created . "',";
            $requete .= "'" . $this->_date_modified . "')";

        }
chromePHP::log($requete);
        $r = $this->conn->query($requete) or die($this->conn->error.__LINE__);
        return $r;
    }


    //***** Fonction de passege sql->objet *****
    private function mapSqlToObject($rs) {
        $metier = new listmetier();
        $metier->setId($rs["id"]);
        $metier->_libelle = $rs["libelle"];
        $metier->_sub_libelle = $rs["sub_libelle"];
        $metier->_active = $rs["active"];
        $metier->_date_modified = $rs["date_modified"];
        $metier->_date_created = $rs["date_created"];
        return $metier;
    }

    public function rechercher() { // Recherche de toutes les adresses

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
        chromePHP::log($requete);
        return $this->mapSqlToObject(mysqli_fetch_array($rs));
    }
}