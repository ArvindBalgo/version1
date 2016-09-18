<?php
include_once 'include_all.php';
$mode = $_GET['mode'];
if($mode == 0) {
    $id = $_GET["id"];
    $cata = new cata();
    $results = $cata->findAllByMetier($id);
    /*$sample = new gabarits();
    $sample = $sample->findByIdModel($id);*/
    print json_encode($results);
    return;
}
else if($mode == 1) {
    $type = $_GET["type"];
    $sample = new gabarits();
    $sample = $sample->findByType($type);
    $cata  = new cata();
    $cata = $cata->rechercher();
    if(count($cata) == 0) {
        print "null";
        return;
    }


    $arrData = [];
/*    foreach($sample as $ligne) {
        $img_src = [];
        $img_src[] =array('id'=>$ligne["id"], "src"=>$ligne["src"]);
        $arrData[] = array('id'=>$ligne["id"], 'title'=>$ligne["description"], 'thumbnail_src'=>$ligne["src"], 'img_src'=>$img_src);
    }
*/
    foreach($cata as $ligne) {
        $img_src = [];
        $arrFront = [];
        $arrBack = [];
        $arrElem = [];

        $cata_ligne = new cata_ligne();
        $cata_ligne = $cata_ligne->findByPrimaryKey($ligne["id_front"]);
        $cata_ligne_params = new cata_ligne_params();
        $cata_ligne_params = $cata_ligne_params->findByIdCata($cata_ligne->getId());
        $arrFront = array('id'=>$cata_ligne->getId(), 'src'=>$cata_ligne->getSrc(), 'title'=>$cata_ligne->getTitle(), 'params' =>$cata_ligne_params);

        $cata_back = $cata_ligne->findByPrimaryKey($ligne["id_back"]);
        $cata_ligne_params1 = new cata_ligne_params();
        $cata_ligne_params1 =  $cata_ligne_params1->findByIdCata($cata_back->getId());

        $arrBack = array('id'=>$cata_back->getId(), 'src'=>$cata_back->getSrc(), 'title'=>$cata_back->getTitle(), 'params'=>$cata_ligne_params1);

        //$img_src[] =array('id'=>$cata_ligne->getId(), "src"=>$cata_ligne->getSrc());
        //$arrData[] = array('id'=>$ligne["id"], 'title'=>$ligne["libelle"], 'thumbnail_src'=>$ligne["src"], 'img_src'=>$img_src);
        $arrData[] = array('id'=>$ligne["id"], 'title'=>$ligne["libelle"], 'thumbnail_src'=>$ligne["src"], 'elemfront'=>$arrFront, 'elemback'=>$arrBack);
    }
    print json_encode($arrData);
    //print json_encode($sample);
    return;
}
else if($mode == 2){
    $data = json_encode($_GET["data"]);
    $sample = new sample();
    $sample->setIdModelMetier(2);
    $sample->setDescription("1324568");
    $sample->setContent(($data));
    $sample->save();
    print json_decode($data);
}
else if($mode == 3){
    $cata_metier = new cata_metier();
    $cata_metier = $cata_metier->findByMetier($_GET["metier"]);
    $arrIdCata = [];
    foreach($cata_metier as $ligne){
        $arrIdCata[] = $ligne["id_cata"];
    }
    $strCata = implode(",", $arrIdCata);
    $cata  = new cata();
    $cata = $cata->findAllByIdCataRange($strCata);

    $arrData = [];
    /*    foreach($sample as $ligne) {
            $img_src = [];
            $img_src[] =array('id'=>$ligne["id"], "src"=>$ligne["src"]);
            $arrData[] = array('id'=>$ligne["id"], 'title'=>$ligne["description"], 'thumbnail_src'=>$ligne["src"], 'img_src'=>$img_src);
        }
    */
    foreach($cata as $ligne) {
        $img_src = [];
        $arrFront = [];
        $arrBack = [];
        $arrElem = [];

        $cata_ligne = new cata_ligne();
        $cata_ligne = $cata_ligne->findByPrimaryKey($ligne["id_front"]);
        $cata_ligne_params = new cata_ligne_params();
        $cata_ligne_params = $cata_ligne_params->findByIdCata($cata_ligne->getId());
        $arrFront = array('id'=>$cata_ligne->getId(), 'src'=>$cata_ligne->getSrc(), 'title'=>$cata_ligne->getTitle(), 'params' =>$cata_ligne_params);

        $cata_back = $cata_ligne->findByPrimaryKey($ligne["id_back"]);
        $cata_ligne_params1 = new cata_ligne_params();
        $cata_ligne_params1 =  $cata_ligne_params1->findByIdCata($cata_back->getId());

        $arrBack = array('id'=>$cata_back->getId(), 'src'=>$cata_back->getSrc(), 'title'=>$cata_back->getTitle(), 'params'=>$cata_ligne_params1);

        $arrData[] = array('id'=>$ligne["id"], 'title'=>$ligne["libelle"], 'thumbnail_src'=>$ligne["src"], 'elemfront'=>$arrFront, 'elemback'=>$arrBack);
    }
    print json_encode($arrData);
    return;
}