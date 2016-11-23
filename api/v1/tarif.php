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
        $cata_dimension = $cata_dimension->findBySubCatDim($_GET["id"] , $dim);
        if($cata_dimension == 0){
            $dimension = new cata_dimension();
            $dimension->setIdSubCategory($_GET["id"]);
            $dimension->setDimension(($dim));
            $dimension->setCoeff(0);
            $dimension->save();
        }
    }

    //recup de tous les ligne de dimension par sous category
    $dimensionAll = new cata_dimension();
    $dimensionAll = $dimensionAll->findByIDSCategory($_GET["id"]);
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
    print json_encode($arrData);

}
