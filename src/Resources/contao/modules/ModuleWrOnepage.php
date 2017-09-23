<?php

class ModuleWrOnepage extends \Module {

    protected $strTemplate = 'mod_wr_onepage_navigation';
    protected function compile()
    {
        global $objPage;
        if($this->rootPage){
            $Articles=\Contao\ArticleModel::findByPid($this->rootPage);
            $rootPageId=\Contao\PageModel::findById($this->rootPage);
            $this->Template->uri = $rootPageId->getFrontendUrl('');
        } else{
            $Articles=\Contao\ArticleModel::findByPid($objPage->id);
            $urlGenerator=\Contao\System::getContainer()->get('contao.routing.url_generator');
            $this->Template->uri = $url=$urlGenerator->generate($objPage->alias);
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
        $this->Template->arrArticle = $arrArticle;
    }
}