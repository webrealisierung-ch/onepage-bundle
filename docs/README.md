# Onepage Bundle for Contao Open Source CMS

With this bundle you can easily add a onepage navigation to your website.

## Attention

This bundle is currently under development. You can use it at your own risk! A stable version will be available soon. Of course you can submit issues and feature requests on the [repository issue section](https://github.com/webrealisierung-ch/onepage-bundle/issues). Thx! 

## How to install

### Contao Managed Edition


**With the awesome Contao Manager**

1. Search in the Contao Manager search bar the bundle `wr/onepage-bundle` and click on the install button.
2. Go to the install tool and update the database. Then login into the back end.

**Without the awesome Contao Manager**

Run in your project folder the following Composer command to add the Onepage Bundle to your project:

```console
    composer require wr/onepage-bundle
```

Clear the cache and warmup the cache with the following two commands:

```console
    vendor/bin/contao-console cache:clear --no-warmup
    vendor/bin/contao-console cache:warmup
```

Go to the install tool and update the database. Then login into the back end.

## Dependencies

- `php: ^7.0`
- `symfony/symfony: ^3.3`
- `contao/core-bundle: ^4.4`

## Licence

The onepage bundle is published under the LGPLv3.

## Documentation

[Go to the documentation](https://webrealisierung-ch.github.io/onepage-bundle/DOCUMENTATION)

[Zur Dokumentation (DE)](https://webrealisierung-ch.github.io/onepage-bundle/DOCUMENTATION-DE)

 ## Contact and Support
 
 For further information feel free and get in contact with us: mail@webrealisierung.ch
 
 ## Donation
 
 If you like our work feel free to donate.
 
 There are many ways to donate to the project. The following list contains some possibilities:
 
 - Contribute your code over pull requests.
 - Test, test, test and feedback.
 - Submit features or issues.
 - Tell us a joke.
 - [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EHB7BYWLMPV7Y) You know that every coffee counts while coding:-)
 
