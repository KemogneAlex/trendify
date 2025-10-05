export const PERSONALIZED_WELCOME_EMAIL_PROMPT = `Générez un contenu HTML hautement personnalisé qui sera inséré dans un modèle d'email à l'emplacement {{intro}}.

Données du profil utilisateur :
{{userProfile}}

EXIGENCES DE PERSONNALISATION :
Vous DEVEZ créer un contenu clairement adapté à CET utilisateur spécifique en :

IMPORTANT : Ne commencez PAS le contenu personnalisé par "Bienvenue" car l'en-tête de l'email dit déjà "Bienvenue à bord {{name}}". Utilisez des formules alternatives comme "Merci de nous avoir rejoint", "Ravi de vous compter parmi nous", "Vous êtes prêt", "Timing parfait", etc.

1. **Référence directe aux détails de l'utilisateur** : Extrayez et utilisez des informations spécifiques de son profil :
   - Ses objectifs d'investissement exacts
   - Son niveau de tolérance au risque déclaré
   - Ses secteurs/industries préférés mentionnés
   - Son niveau d'expérience ou son parcours
   - Les actions/entreprises spécifiques qui l'intéressent
   - Son horizon d'investissement (court terme, long terme, retraite)

2. **Message contextuel** : Créez un contenu qui montre que vous comprenez sa situation :
   - Nouveaux investisseurs → Mentionnez l'apprentissage/le début de leur parcours
   - Traders expérimentés → Mentionnez les outils avancés/l'amélioration de la stratégie
   - Planification de la retraite → Mentionnez la constitution de patrimoine sur le long terme
   - Secteurs spécifiques → Mentionnez ces secteurs exacts par leur nom
   - Approche conservatrice → Mentionnez la sécurité et les décisions éclairées
   - Approche agressive → Mentionnez les opportunités et le potentiel de croissance

3. **Touche personnelle** : Donnez l'impression que le message a été écrit spécialement pour eux :
   - Utilisez leurs objectifs dans votre message
   - Mentionnez leurs centres d'intérêt directement
   - Liez les fonctionnalités à leurs besoins spécifiques
   - Faites-leur sentir compris et reconnus

EXIGENCES DE FORMATAGE CRUCIALES :
- Retournez UNIQUEMENT du contenu HTML propre SANS markdown, SANS blocs de code, SANS backticks
- Utilisez UN SEUL paragraphe : <p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">contenu</p>
- Écrivez exactement DEUX phrases (une de plus que la phrase unique actuelle)
- Gardez le contenu total entre 35 et 50 mots pour une meilleure lisibilité
- Utilisez <strong> pour les éléments personnalisés clés (leurs objectifs, secteurs, etc.)
- N'incluez PAS "Voici ce que vous pouvez faire maintenant :" car c'est déjà dans le modèle
- Chaque mot doit contribuer à la personnalisation
- La deuxième phrase doit apporter un contexte utile ou renforcer la personnalisation

Exemples de sorties personnalisées (montrant une personnalisation évidente avec DEUX phrases) :
<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Merci d'avoir rejoint Signalist ! En tant que passionné des <strong>actions technologiques de croissance</strong>, vous allez adorer nos alertes en temps réel pour les entreprises que vous suivez. Nous vous aiderons à repérer les opportunités avant qu'elles ne fassent la une.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Ravi de vous compter parmi nous ! Parfait pour votre <strong>stratégie de retraite prudente</strong> — nous vous aiderons à surveiller les actions à dividendes sans vous submerger d'informations. Vous pourrez enfin suivre l'évolution de votre portefeuille en toute confiance.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Vous êtes prêt ! Comme vous débutez en investissement, nous avons conçu des outils simples pour vous aider à prendre confiance tout en découvrant le <strong>secteur de la santé</strong> qui vous intéresse. Nos alertes pour débutants vous guideront sans le jargon technique déroutant.</p>`;

export const NEWS_SUMMARY_EMAIL_PROMPT = `Générez un contenu HTML pour un résumé des actualités boursières qui sera inséré dans le modèle d'email NEWS_SUMMARY_EMAIL_TEMPLATE à l'emplacement {{newsContent}}.

Données d'actualités à résumer :
{{newsData}}

EXIGENCES DE FORMATAGE CRITIQUES :
- Retournez UNIQUEMENT du contenu HTML propre SANS markdown, SANS blocs de code, SANS backticks
- Structurez le contenu avec des sections claires en utilisant des en-têtes et des paragraphes HTML appropriés
- Utilisez ces classes CSS et styles spécifiques pour correspondre au modèle d'email :

TITRES DE SECTION (pour les catégories comme "Aperçu du marché", "Meilleures performances", etc.) :
<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 18px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">Titre de la section</h3>

PARAGRAPHES (pour le contenu des actualités) :
<p class="mobile-text dark-text-secondary" style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Le contenu va ici</p>

MENTIONS D'ACTIONS/ENTREPRISES :
<strong style="color: #FDD458;">Symbole</strong> pour les symboles boursiers
<strong style="color: #CCDADC;">Nom de l'entreprise</strong> pour les noms d'entreprises

INDICATEURS DE PERFORMANCE :
Utilisez 📈 pour les hausses, 📉 pour les baisses, 📊 pour neutre/mixte

STRUCTURE DES ARTICLES D'ACTUALITÉS :
Pour chaque élément d'actualité dans une section, utilisez cette structure :
1. Conteneur d'article avec style visuel et icône
2. Titre de l'article comme sous-titre
3. Points clés sous forme de puces (2-3 informations exploitables)
4. Section "Ce que cela signifie" pour le contexte
5. Lien "Lire la suite" vers l'article original
6. Séparateur visuel entre les articles

CONTENEUR D'ARTICLE :
Encadrez chaque article dans un conteneur propre et simple :
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">

TITRES D'ARTICLES :
<h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">
Titre de l'article ici
</h4>

POINTS CLÉS (minimum 3 éléments concis) :
Utilisez ce format avec des explications claires et concises (aucun libellé nécessaire) :
<ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Explication claire et concise en termes simples, facile à comprendre rapidement.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Explication brève avec les chiffres clés et leur signification en langage simple.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Point à retenir sur ce que cela signifie pour l'argent des gens ordinaires.
  </li>
</ul>

SECTION D'ANALYSE :
Ajoutez une explication contextuelle simple :
<div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #FDD458;">En résumé :</strong> Explication simple de l'importance de cette nouvelle pour votre argent en langage courant.</p>
</div>

BOUTON LIRE LA SUITE :
<div style="margin: 20px 0 0 0;">
<a href="URL_DE_L_ARTICLE" style="color: #FDD458; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Lire la suite →</a>
</div>

SÉPARATEUR D'ARTICLE :
Fermez chaque conteneur d'article :
</div>

SÉPARATEURS DE SECTION :
Entre les sections principales, utilisez :
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>

Directives de contenu :
- Organisez les actualités en sections logiques avec des icônes (📊 Aperçu du marché, 📈 Meilleures performances, 📉 Moins bonnes performances, 🔥 Actualités importantes, 💼 Rapports trimestriels, 🏛️ Données économiques, etc.)
- NE JAMAIS répéter les titres de section - n'utilisez chaque type de section qu'une seule fois par email
- Pour chaque article, incluez son titre réel des données d'actualités
- Fournissez au MOINS 3 POINTS CLÉS concis (PAS de libellé "Points clés" - commencez directement par les puces)
- Chaque point doit être COURT et FACILE À COMPRENDRE - une seule phrase claire de préférence
- Utilisez un LANGAGE SIMPLE - évitez le jargon, les termes financiers complexes ou le langage technique
- Expliquez les concepts comme si vous parliez à quelqu'un qui débute en investissement
- Incluez des chiffres spécifiques mais expliquez leur signification en termes simples
- Ajoutez un contexte "En résumé" dans un langage que tout le monde peut comprendre
- Utilisez une conception propre et légère avec des puces jaunes pour une meilleure lisibilité
- Rendez chaque article facile à parcourir avec un espacement et une structure clairs
- Incluez toujours des boutons "Lire la suite" simples avec des URL réelles
- Concentrez-vous sur des CONSEILS PRATIQUES que les gens ordinaires peuvent comprendre et utiliser
- Expliquez ce que les nouvelles signifient pour l'argent des investisseurs ordinaires
- Maintenez un langage conversationnel et accessible à tous
- Privilégiez la BRÈVETÉ et la CLARTÉ plutôt que des explications détaillées

Exemple de structure :
<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 20px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">📊 Aperçu du marché</h3>

<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
<h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FDD458; line-height: 1.4;">
Marché boursier mitigé aujourd'hui
</h4>

<ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Les actions technologiques comme Apple ont progressé de 1,2% aujourd'hui, une bonne nouvelle pour les investisseurs du secteur.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Les entreprises traditionnelles ont reculé de 0,3%, montrant que les investisseurs privilégient actuellement la tech.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Un volume d'échanges élevé (12,4 milliards d'actions) indique une forte activité des investisseurs.
  </li>
</ul>

<div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #FDD458;">En résumé :</strong> Si vous possédez des actions technologiques, c'est une bonne journée pour vous. Si vous envisagez d'investir, les entreprises technologiques pourraient être un choix judicieux en ce moment.</p>
</div>

<div style="margin: 20px 0 0 0;">
<a href="https://example.com/article1" style="color: #FDD458; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Lire la suite →</a>
</div>
</div>

<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>

<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 20px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">📈 Meilleures performances</h3>

<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
<h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FDD458; line-height: 1.4;">
L'action Apple bondit après d'excellents résultats
</h4>

<ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>L'action Apple a bondi de 5,2% après avoir dépassé les attentes des analystes.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Les ventes d'iPhone devraient augmenter de 8% le trimestre prochain malgré l'incertitude économique.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>L'App Store et les services ont généré 22,3 milliards de dollars de revenus (+14%), assurant des revenus stables.
  </li>
</ul>

<div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #FDD458;">En résumé :</strong> Apple génère des revenus de différentes manières (téléphones ET services), ce qui en fait une action relativement sûre à détenir même en période d'incertitude économique.</p>
</div>

<div style="margin: 20px 0 0 0;">
<a href="https://example.com/article2" style="color: #FDD458; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Lire la suite →</a>
</div>
</div>`;

export const TRADINGVIEW_SYMBOL_MAPPING_PROMPT = `Vous êtes un expert en marchés financiers et plateformes de trading. Votre tâche est de trouver le symbole TradingView correct qui correspond à un symbole Finnhub donné.

Informations sur l'action depuis Finnhub :
Symbole : {{symbol}}
Entreprise : {{company}}
Bourse : {{exchange}}
Devise : {{currency}}
Pays : {{country}}

RÈGLES IMPORTANTES :
1. TradingView utilise des formats de symboles spécifiques qui peuvent différer de Finnhub
2. Pour les actions américaines : Généralement juste le symbole (par exemple, AAPL pour Apple)
3. Pour les actions internationales : Inclut souvent le préfixe de la bourse (par exemple, NASDAQ:AAPL, NYSE:MSFT, LSE:BARC)
4. Certains symboles peuvent avoir des suffixes pour différentes classes d'actions
5. Les ADR et actions étrangères peuvent avoir des formats de symboles différents

FORMAT DE RÉPONSE :
Retournez UNIQUEMENT un objet JSON valide avec cette structure exacte :
{
  "tradingViewSymbol": "BORSE:SYMBOLE",
  "confidence": "élevée|moyen|faible",
  "reasoning": "Brève explication de la raison pour laquelle ce mappage est correct"
}

EXEMPLES :
- Apple Inc. (AAPL) de Finnhub → {"tradingViewSymbol": "NASDAQ:AAPL", "confidence": "élevée", "reasoning": "Apple est cotée sur le NASDAQ sous le symbole AAPL"}
- Microsoft Corp (MSFT) de Finnhub → {"tradingViewSymbol": "NASDAQ:MSFT", "confidence": "élevée", "reasoning": "Microsoft est coté sur le NASDAQ sous le symbole MSFT"}
- Barclays PLC (BARC.L) de Finnhub → {"tradingViewSymbol": "LSE:BARC", "confidence": "élevée", "reasoning": "Barclays est coté à la Bourse de Londres sous le symbole BARC"}

Votre réponse doit être UNIQUEMENT du JSON valide. N'incluez aucun autre texte.`;
