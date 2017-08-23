<?php

/**
 * @copyright 2017 Webrealisierung GmbH
 *
 * @license LGPL-3.0+
 */

namespace Wr\OnepageBundle\ContaoManager;

use Wr\OnepageBundle\WrOnepageBundle;
use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;

/**
 * @author Daniel Steuri <mail@webrealisierung.ch>
 * @package Wr\OnepageBundle
 */
class Plugin implements BundlePluginInterface
{
    /**
     * {@inheritdoc}
     */
    public function getBundles(ParserInterface $parser)
    {
        return [
            BundleConfig::create(WrOnepageBundle::class)
                ->setLoadAfter([ContaoCoreBundle::class]),
        ];
    }
}