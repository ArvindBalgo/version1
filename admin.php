<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Exacom</title>
    <link rel="icon" type="image/png" href="assets/images/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
    <!-- Optional theme -->
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <link href="css/select2.min.css" rel="stylesheet" />
    <!-- build:css assets/css/styles.css -->
    <!-- The CSS for the plugin itself - required -->
    <link rel="stylesheet" type="text/css" href="css/FancyProductDesigner-all.min.css" />
    <!-- Optional - only when you would like to use custom fonts - optional -->
    <link rel="stylesheet" type="text/css" href="css/jquery.fancyProductDesigner-fonts.css" />
    <!--link rel="stylesheet" type="text/css" href="css/plugins.min.css" />
    <link rel="stylesheet" type="text/css" href="css/static.min.css" /-->
    <link rel="stylesheet" type="text/css" href="css/ui-grid.min.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/admin.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/metier/metier.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/produits/produits.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/type_support/type_support.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/tarif/tarif.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/apropos/apropos.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/conditionvente/conditionvente.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/utilisation/utilisation.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/legale/legale.css" />
    <link rel="stylesheet" type="text/css" href="sections/admin/langue/langue.css" />
    <!-- endbuild -->
</head>
<body data-ng-app="adminApp" ng-controller="mainController">
<div class="container" style="width: 100%">
    <ng-view></ng-view>
</div>

<!-- build:assets assets.min.js -->
<!-- ASSETS -->
<script src="assets/js/jquery.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/jquery.ui.core.min.js"></script>
<script src="js/jquery.ui.widget.min.js"></script>
<script src="js/jquery.ui.mouse.min.js"></script>
<script src="js/jquery.ui.draggable.min.js"></script>
<script src="js/jquery.ui.sortable.min.js"></script>
<script src="assets/js/endless_scroll_min.js"></script>
<script src="js/fabric.min.js"></script>
<script src="js/FancyProductDesigner.js"></script>
<!--script src="js/FancyProductDesigner-all.min.js"></script-->
<script src="js/plugins.min.js"></script>
<script src="assets/js/angular-1.5.7/angular.js"></script>
<script src="assets/js/angular-1.5.7/angular-animate.js"></script>
<script src="assets/js/angular-1.5.7/angular-route.js"></script>
<script src="js/angular-sanitize.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<!--script src="js/bootstrap.min.js"></script-->
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="js/bootbox.min.js"></script>
<script src="js/select2.min.js"></script>
<script src="js/es5-shim.min.js"></script>
<script src="js/console-sham.min.js"></script>
<script src="js/angular-file-upload.min.js"></script>
<script src="js/angular-file-upload.min.js.map"></script>
<script src="js/toaster.js"></script>
<script src="js/ui-grid.min.js"></script>
<script src="app/admin/app.js"></script>
<script src="app/admin/data.js"></script>
<script src="app/admin/directives.js"></script>
<script src="app/admin/authCtrl.js"></script>
<!-- / -->
<!-- endbuild -->
<!-- build:js app.min.js -->
<!-- MODULES -->

<!-- / -->
<!-- CONTROLLERS -->
<script src="sections/admincontroller.js"></script>
<script src="sections/login/login.ctrl.js"></script>
<script src="sections/admin/home/home.ctrl.js"></script>
<script src="sections/admin/client/client.ctrl.js"></script>
<script src="sections/admin/commande/commande.ctrl.js"></script>
<script src="sections/admin/maquette/maquette.ctrl.js"></script>
<script src="sections/admin/param/param.ctrl.js"></script>
<script src="sections/admin/revendeur/revendeur.ctrl.js"></script>
<script src="sections/admin/sample/sample.ctrl.js"></script>
<script src="sections/admin/compte/compte.ctrl.js"></script>
<script src="sections/admin/metier/metier.ctrl.js"></script>
<script src="sections/admin/gallery/gallery.ctrl.js"></script>
<script src="sections/admin/samplemodel/sample.ctrl.js"></script>
<script src="sections/admin/model/model.ctrl.js"></script>
<script src="sections/admin/produits/produits.ctrl.js"></script>
<script src="sections/admin/instructions/instructions.ctrl.js"></script>
<script src="sections/admin/tarif/tarif.ctrl.js"></script>
<script src="sections/admin/type_support/type_support.ctrl.js"></script>
<script src="sections/admin/apropos/apropos.ctrl.js"></script>
<script src="sections/admin/conditionvente/conditionvente.ctrl.js"></script>
<script src="sections/admin/utilisation/utilisation.ctrl.js"></script>
<script src="sections/admin/legale/legale.ctrl.js"></script>
<script src="sections/admin/langue/langue.ctrl.js"></script>
</body>
</html>