<?php

class ModuleWrOnepage extends \Module {

    protected $strTemplate = 'mod_wr-onepage-navigation';
    protected function compile()
    {
        global $objPage;
        if($this->rootPage){
            $Articles=\Contao\ArticleModel::findByPid($this->rootPage, array('order'=>'sorting'));
            $rootPageId=\Contao\PageModel::findById($this->rootPage);
            $this->Template->uri = $rootPageId->getFrontendUrl('');
        } else{
            $Articles=\Contao\ArticleModel::findByPid($objPage->id, array('order'=>'sorting'));
            $urlGenerator=\Contao\System::getContainer()->get('contao.routing.url_generator');
            $this->Template->uri = $url=$urlGenerator->generate($objPage->alias);
        }

        if($this->loadDefaultJavascript){
            //$GLOBALS['TL_JAVASCRIPT'][] = 'bundles/wronepage/Scroller.min.js';
            //$GLOBALS['TL_JAVASCRIPT'][] = 'bundles/wronepage/Onepage.min.js';
            $GLOBALS['TL_BODY'][] = '<script src="bundles/wronepage/Scroller.min.js"></script>';
            $GLOBALS['TL_BODY'][] = '<script src="bundles/wronepage/Onepage.min.js"></script>';
        }

        $arrArticle = array();
        foreach($Articles as $article){
            if(strlen($article->in_onepage && $article->published)){
                array_push($arrArticle,
                    array(
                        'title'=>$article->title,
                        'alias'=>$article->alias
                    )
                );
            }
        }

        $this->Template->request = ampersand(\Environment::get('indexFreeRequest'));
        $this->Template->skipId = 'skipNavigation' . $this->id;
        $this->Template->loadStandartJavascipt = $this->loadDefaultJavascript;
        $this->Template->arrArticle = $arrArticle;
    }
}