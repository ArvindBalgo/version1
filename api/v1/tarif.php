<?php
/**
 * Created by PhpStorm.
 * User: Arvind
 * Date: 11/20/2016
 * Time: 4:19 PM
 */

include_once 'include_all.php';

$mode = intval($_GET['mode']);

if($mode == 0) {
    $arrData  =array();

    $cata = new cata();
    $cata = $cata->findDimsByModel($_GET["id"]);
    $cata = trim($cata, ',');
    $arrDims = explode(",",$cata);

    foreach ($arrDims as $dim) {
        if( $dim == '') {
            continue;
        }
        $cata_dimension = new cata_dimension();
        $cata_dimension = $cata_dimension->findBySubCatDim($_GET["id"] , $dim, intval($_GET["tarifid"]));
        if($cata_dimension == 0){
            $dimension = new cata_dimension();
            $dimension->setIdSubCategory($_GET["id"]);
            $dimension->setDimension(($dim));
            $dimension->setCoeff(0);
            $dimension->setIdSousCategoryCoeffPrix(intval($_GET["tarifid"]));
            $dimension->save();
        }
    }

    //recup de tous les ligne de dimension par sous category
    $dimensionAll = new cata_dimension();
    $dimensionAll = $dimensionAll->findByIDSCategory($_GET["id"], intval($_GET["tarifid"]));
    $arrData["dimension"] = $dimensionAll;

    $cata_metier = new modelmetier();
    $cata_metier = $cata_metier->findByPrimaryKey($_GET["id_metier"]);

    $arrQte = explode(',',trim($cata_metier->getQte() , ','));
    $arrData["qte"] = $arrQte;
    $test = array();
    foreach ($arrQte as $qte) {
        $test[$qte] = array('qte'=>0 , 'prix'=>0);
    }
    //type de support
    $cata_papier = new cata_papier();
    $cata_papier = $cata_papier->rechercher();
    $arrData["papier"]  = $cata_papier;

    foreach ($arrData["papier"] as $key=>$ligne) {
        $arrData["papier"][$key]["qte"] = $test;
    }


    //tarif actuels
    $cata_support = new cata_support();
    $cata_support  = $cata_support->findBySousCategory($_GET["id"]);
    $arrData["tarif"] = $cata_support;

    //prix sauvegarder
    $cprix = new coeff_prix();
    $cprix = $cprix->findBySousCategory(intval($_GET["id"]), intval($_GET["tarifid"]));
    $arrData["tarifactuel"] = $cprix;

    $cprix = new coeff_prix();
    $cprix = $cprix->getListIdPapierSupport(intval($_GET["id"]), intval($_GET["tarifid"]));
    $arrData["selsupport"] = $cprix["ligne"];


    print json_encode($arrData);

}
else if($mode == 1) {
    $souscategory_coeffprix = new souscategory_coeffprix();
    $souscategory_coeffprix = $souscategory_coeffprix->findBySousCategory(intval($_GET["id"]));
    print json_encode($souscategory_coeffprix);
}
else if($mode == 2) {
    //new tarif
    $souscategory_coeffprix  = new souscategory_coeffprix();
    if(intval($_GET["id"]) > 0) {
        $souscategory_coeffprix = $souscategory_coeffprix->findByPrimaryKey(intval($_GET["id"]));
    }
    $souscategory_coeffprix->setNom($_GET["nom"]);
    $souscategory_coeffprix->setSousCategory(intval($_GET["souscategory"]));
    $souscategory_coeffprix->save();
}
else if($mode == 3) {
    $coeff_prix = new coeff_prix();
    $coeff_prix->delByIdSousCategoryCoeffPrix(intval($_GET["id"]));
    $souscategory_coeffprix = new souscategory_coeffprix();
    $souscategory_coeffprix->delete(intval($_GET["id"]));
    print 'done';
}
