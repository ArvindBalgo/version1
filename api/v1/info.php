<?php
include_once 'include_all.php';

$mode = $_GET['mode'];
if($mode == 0) {
    $metier = new listmetier();
    $metier = $metier->rechercher();

    print json_encode($metier);
    return;
}
else if($mode == 1) {
    $metier = new listmetier();
    $metier->setLibelle($_GET["desig"]);
    $metier->setSubLibelle($_GET["sub_desig"]);
    $metier->setActive(1);
    $re= $metier->save();
    print $re;
    return;
}
else if($mode == 2) {
    $metier = new modelmetier();
    $metier = $metier->rechercher();
    print json_encode($metier);
    return;
}
else if($mode == 3) {
    $cata = new cata();
    $cata = $cata->findAllByMetier($_GET["metier"]);
    $row =[];
    foreach($cata as $ligcata){
        $cata_ligne = new cata_ligne();

        $cata_ligne = $cata_ligne->findByPrimaryKey($ligcata["id_front"]);
        $cata_ligne_params = new cata_ligne_params();
        $cata_ligne_params = $cata_ligne_params->findByIdCata($ligcata["id_front"]);

        $arrFront = ["src"=>$cata_ligne->getSrc(),"title"=>$cata_ligne->getTitle(), "elements"=>$cata_ligne_params ];
        $ligcata["front"] = $arrFront;



        $cata_ligne = $cata_ligne->findByPrimaryKey($ligcata["id_back"]);
        $cata_ligne_params = new cata_ligne_params();
        $cata_ligne_params = $cata_ligne_params->findByIdCata($ligcata["id_front"]);
        $arrBack = ["src"=>$cata_ligne->getSrc(),"title"=>$cata_ligne->getTitle(), "elements"=>$cata_ligne_params ];
        $ligcata["back"] = $arrBack;

        $row[] = $ligcata;
    }
print json_encode($row);
    return;
}
else if($mode == 4) {
    $listmetier = new listmetier();
    $listmetier->setLibelle(trim($_GET["libelle"]));
    $listmetier->setSubLibelle(trim($_GET["sub_libelle"]));
    $listmetier->setActive($_GET["actif"]);

    $listmetier->save();
}

else if($mode == 5){
    $listmetier  = new listmetier();
    $listmetier = $listmetier->findByPrimaryKey(trim($_GET["id"]));

    $listmetier->setId($listmetier->getId());
    $listmetier->setLibelle(trim($_GET["libelle"]));
    $listmetier->setSubLibelle(trim($_GET["sub_libelle"]));
    $listmetier->setActive($_GET["actif"]);

    $listmetier->save();
}

else if($mode == 6){
    $model = new modelmetier();
    $model = $model->findByPrimaryKey(trim($_GET["id"]));
    $model->setDescription(trim($_GET["name"]));
    $model->setQte($_GET["qte"]);
    chromePHP::log($_GET["qte"] . "   ===  ");
    $model->setActive($_GET["active"]);

    $model->save();
    print "done";
}