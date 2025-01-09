from datetime import datetime, timedelta

from app.models import Product, db


def seed_products():
    """Seed the database with example pharmacy products."""
    products = [
        Product(
            name="Aspirin 500mg",
            manufacturer="Bayer",
            description="Aspirin 500mg is a trusted over-the-counter pain reliever and fever reducer. It is commonly used to alleviate headaches, migraines, muscle pain, arthritis discomfort, and to reduce fever. Aspirin is also recognized for its blood-thinning properties and is often recommended for heart health under medical supervision.",
            price=9.99,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="https://azcdn.doz.pl/image/d/product/4d34c93f-scale-350x350.jpg",
        ),
        Product(
            name="Paracetamol 650mg",
            manufacturer="GSK",
            description="Paracetamol 650mg is an effective analgesic and antipyretic medication used to relieve mild to moderate pain and reduce fever. It is ideal for conditions such as common cold, flu, headaches, toothaches, menstrual cramps, and muscle pain. Its fast-acting formula ensures quick relief with minimal side effects.",
            price=5.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="https://5.imimg.com/data5/SELLER/Default/2021/12/QD/NL/OX/43755673/ilaprazole-tablets-500x500.jpg"
        ),
        Product(
            name="Ibuprofen 400mg",
            manufacturer="Pfizer",
            description="Ibuprofen 400mg is a non-steroidal anti-inflammatory drug (NSAID) that provides relief from pain, inflammation, and fever. It is commonly used for conditions such as arthritis, sprains, strains, back pain, and menstrual cramps. Its dual-action formula targets inflammation and pain simultaneously.",
            price=8.49,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="https://www.allecco.pl/ibuprofen-400-mg-20-tabl.1.jpg?4VG3f"
        ),
        Product(
            name="Amoxicillin 500mg Capsules",
            manufacturer="Teva Pharmaceuticals",
            description="Amoxicillin 500mg is a broad-spectrum antibiotic used to treat a variety of bacterial infections, including respiratory tract infections, ear infections, urinary tract infections, and skin infections. It works by stopping the growth of bacteria, promoting quick recovery from infections.",
            price=12.99,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="https://www.canonbury.com/media/catalog/product/cache/ac001188e3511e11921f4c9c9c586cfc/a/m/amoxicillin_capsules_500mg_15_pl_la_.png"
        ),
        Product(
            name="Cetirizine Hydrochloride 10mg",
            manufacturer="Zyrtec",
            description="Cetirizine Hydrochloride 10mg is a powerful antihistamine that provides long-lasting relief from allergy symptoms such as sneezing, runny nose, itchy or watery eyes, and skin rashes. It works quickly to reduce the effects of histamines in the body, ensuring comfort throughout the day.",
            price=6.49,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="https://www.padagis.com/wp-content/uploads/2024/02/4H2_Cetirizine_10mg.png"
        ),
        Product(
            name="Omeprazole 20mg",
            manufacturer="AstraZeneca",
            description="Omeprazole 20mg is a proton pump inhibitor (PPI) that helps reduce stomach acid production. It is commonly used to treat acid reflux, heartburn, and gastroesophageal reflux disease (GERD). It also aids in the healing of ulcers and prevents damage to the esophagus caused by stomach acid.",
            price=10.99,
            expiry_date=datetime.now() + timedelta(days=1095),
            image_url="https://www.lek24.pl/omeprazole-genoptim-sph-20mg-14-kapsulek-dojelitowych.1.jpg"
        ),
        Product(
            name="Metformin 500mg Tablets",
            manufacturer="Sun Pharma",
            description="Metformin 500mg is a first-line medication for managing type 2 diabetes. It helps regulate blood sugar levels by improving insulin sensitivity and reducing glucose production in the liver. It is an essential part of diabetes management plans, often combined with diet and exercise.",
            price=7.99,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="https://www.anberryhospital.com/images/metformin-1.png"
        ),
        Product(
            name="Atorvastatin 20mg",
            manufacturer="Pfizer",
            description="Atorvastatin 20mg is a cholesterol-lowering medication that belongs to the statin class of drugs. It works by reducing levels of bad cholesterol (LDL) and triglycerides while increasing good cholesterol (HDL), lowering the risk of heart attacks and strokes in patients with high cholesterol.",
            price=14.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="https://ktomalek.pl/zdjecia/atorvastatin-genoptim-interakcje-ulotka-B8878226"
        ),
        Product(
            name="Albuterol Inhaler",
            manufacturer="Ventolin",
            description="The Albuterol Inhaler is a fast-acting bronchodilator designed to relieve and prevent symptoms of asthma and chronic obstructive pulmonary disease (COPD). It quickly opens airways, making it easier to breathe during acute asthma attacks or periods of respiratory distress.",
            price=29.99,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="https://www.allivet.com/on/demandware.static/-/Sites-allivet-master/default/50728/50728.jpg"
        ),
        Product(
            name="Loratadine 10mg Tablets",
            manufacturer="Claritin",
            description="Loratadine 10mg is a non-drowsy antihistamine used to relieve seasonal allergy symptoms, including sneezing, runny nose, and itchy or watery eyes. Its long-lasting formula provides 24-hour relief without causing sedation, making it ideal for daytime use.",
            price=6.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="https://www.padagis.com/wp-content/uploads/2021/09/61265.png"
        ),
        Product(
            name="Hydrochlorothiazide 25mg",
            manufacturer="Novartis",
            description="Hydrochlorothiazide 25mg is a diuretic medication used to treat high blood pressure and fluid retention (edema). By promoting the removal of excess salt and water from the body, it helps lower blood pressure and reduce swelling associated with heart, kidney, or liver conditions.",
            price=9.49,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="https://www.emedbucket.com/emedpro_img/uploads/product/main/STERIS_PHARMA/1656157443_133303_0.jpg"
        ),
        Product(
            name="Prednisone 20mg",
            manufacturer="Mylan",
            description="Prednisone 20mg is a corticosteroid medication that reduces inflammation and suppresses the immune system. It is used to treat a variety of conditions, including asthma, allergies, rheumatoid arthritis, and autoimmune diseases. It is also prescribed to manage severe inflammatory disorders.",
            price=15.99,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="https://www.grxstatic.com/d4fuqqd5l3dbz/products/Package_31039.JPG"
        ),
        Product(
            name="Losartan Potassium 50mg",
            manufacturer="Merck",
            description="Losartan Potassium 50mg is an angiotensin II receptor blocker (ARB) used to treat high blood pressure and protect the kidneys from damage due to diabetes. It helps relax blood vessels, improving blood flow and reducing the risk of cardiovascular events.",
            price=11.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="https://api.evaro.com/wp-content/uploads/2021/10/Losartan-FRONT.png"
        ),
        Product(
            name="Clopidogrel 75mg",
            manufacturer="Sanofi",
            description="Clopidogrel 75mg is an antiplatelet medication that prevents blood clots in patients at risk of heart attacks or strokes. It is commonly prescribed after certain heart procedures or for individuals with a history of cardiovascular disease to reduce clot formation.",
            price=18.49,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="https://ktomalek.pl/zdjecia/clopidogrel-genoptim-interakcje-ulotka-B8662501"
        ),
        Product(
            name="Ranitidine 300mg",
            manufacturer="Zantac",
            description="Ranitidine 300mg is an H2 blocker that reduces stomach acid production. It is used to treat conditions such as acid reflux, ulcers, and Zollinger-Ellison syndrome. It provides quick and effective relief from heartburn and aids in the healing of acid-related damage to the stomach lining.",
            price=8.99,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="https://om.rosheta.com/upload/3952b2192e6a1b23b66bb6415a4fed8e334d2453557ac339c6f46fbc9b854c26.webp"
        ),
        Product(
            name="Levothyroxine 100mcg",
            manufacturer="AbbVie",
            description="Levothyroxine 100mcg is a synthetic thyroid hormone used to treat hypothyroidism. It helps restore normal thyroid hormone levels, improving energy, metabolism, and overall well-being. It is essential for maintaining healthy thyroid function in individuals with underactive thyroid glands.",
            price=13.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="https://www.cloudpharmacy.co.uk/uploads/images/products/large/cloud-pharmacy-levothyroxine-levothyroxine-1576076489Levothryoxine.jpg"
        ),
        Product(
            name="Azithromycin 500mg Tablets",
            manufacturer="Zithromax",
            description="Azithromycin 500mg is a macrolide antibiotic used to treat bacterial infections such as respiratory tract infections, skin infections, and sexually transmitted diseases. It is known for its convenience, often requiring a shorter course of treatment than other antibiotics.",
            price=19.99,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="https://accessdoctor.co.uk/wp-content/uploads/2021/08/azithromycin.jpg"
        ),
        Product(
            name="Warfarin 5mg Tablets",
            manufacturer="Coumadin",
            description="Warfarin 5mg is an anticoagulant (blood thinner) used to prevent and treat blood clots in conditions such as deep vein thrombosis (DVT) and pulmonary embolism (PE). It is also prescribed to reduce the risk of stroke in patients with atrial fibrillation or artificial heart valves.",
            price=16.49,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="https://medecify.com/storages/2024/06/IMG-13-scaled.jpeg"
        ),
        Product(
            name="Fluconazole 150mg",
            manufacturer="Pfizer",
            description="Fluconazole 150mg is an antifungal medication used to treat a variety of fungal and yeast infections, including vaginal candidiasis, oral thrush, and systemic fungal infections. Its single-dose treatment for certain conditions makes it a convenient and effective option.",
            price=12.49,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="https://cdn.commerce.dokteronline.com/images/5051be99794c6bca639782f2b48ee9c02f9b262d953e6a478740cc1f55d2f3b8.png"
        ),
        Product(
            name="Vitamin D3 1000 IU",
            manufacturer="Nature Made",
            description="Vitamin D3 1000 IU supports bone health, immune function, and overall wellness by aiding calcium absorption in the body. It is especially beneficial for individuals with limited sun exposure or those at risk of vitamin D deficiency. Ideal for daily supplementation.",
            price=9.99,
            expiry_date=datetime.now() + timedelta(days=1095),
            image_url="https://nordic.pl/cdn/shop/products/nordic-naturals-vitamin-d3-1000-120-softgels-pomarancza-sklep-nordic-pl-849755.jpg?v=1706746142"
        ),
    ]

    for product in products:
        existing_product = Product.query.filter_by(name=product.name).first()
        if not existing_product:
            db.session.add(product)

    db.session.commit()
    print("Products seeded successfully!")
