<?php

/**
 * @copyright 2017 Webrealisierung GmbH
 *
 * @license LGPL-3.0+
 */

namespace Wr\OnepageBundle\Service;

/*
* @author Daniel Steuri <mail@webrealisierung.ch>
*
*/
class OnepageHooks
{
    public function addAliasToArticleCssId($objData){
        $arrCSS = deserialize($objData->cssID, true);
        if(strlen($objData->in_onepage) && strlen($objData->published)){
            $arrCSS[0] =  trim($arrCSS[0] . " " . $objData->alias);
        }
        $objData->cssID = serialize($arrCSS);
    }
}