<?php
$GLOBALS['TL_DCA']['tl_module']['palettes']['wr-onepage-navigation'] = '{title_legend},name,type;{redirect_legend},rootPage;{options_legend},loadDefaultJavascript;{protected_legend:hide},protected;{expert_legend:hide},guests,cssID';


$GLOBALS['TL_DCA']['tl_module']['fields']['loadDefaultJavascript'] = array
(
    'label'                   =>  &$GLOBALS['TL_LANG']['tl_module']['load_default_javascript'],
    'exclude'                 => true,
    'inputType'               => 'checkbox',
    'eval'                    => array('tl_class'=>'w50'),
    'sql'                     => "char(1) NOT NULL default ''"
);