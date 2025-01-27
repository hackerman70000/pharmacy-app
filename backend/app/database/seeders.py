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
            image_url="/static/images/products/aspirin.avif",
        ),
        Product(
            name="Paracetamol 650mg",
            manufacturer="GSK",
            description="Paracetamol 650mg is an effective analgesic and antipyretic medication used to relieve mild to moderate pain and reduce fever. It is ideal for conditions such as common cold, flu, headaches, toothaches, menstrual cramps, and muscle pain. Its fast-acting formula ensures quick relief with minimal side effects.",
            price=5.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="/static/images/products/paracetamol.png",
        ),
        Product(
            name="Ibuprofen 400mg",
            manufacturer="Pfizer",
            description="Ibuprofen 400mg is a non-steroidal anti-inflammatory drug (NSAID) that provides relief from pain, inflammation, and fever. It is commonly used for conditions such as arthritis, sprains, strains, back pain, and menstrual cramps. Its dual-action formula targets inflammation and pain simultaneously.",
            price=8.49,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="/static/images/products/ibuprofen.webp",
        ),
        Product(
            name="Amoxicillin 500mg Capsules",
            manufacturer="Teva Pharmaceuticals",
            description="Amoxicillin 500mg is a broad-spectrum antibiotic used to treat a variety of bacterial infections, including respiratory tract infections, ear infections, urinary tract infections, and skin infections. It works by stopping the growth of bacteria, promoting quick recovery from infections.",
            price=12.99,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="/static/images/products/amoxicillin.png",
        ),
        Product(
            name="Cetirizine Hydrochloride 10mg",
            manufacturer="Zyrtec",
            description="Cetirizine Hydrochloride 10mg is a powerful antihistamine that provides long-lasting relief from allergy symptoms such as sneezing, runny nose, itchy or watery eyes, and skin rashes. It works quickly to reduce the effects of histamines in the body, ensuring comfort throughout the day.",
            price=6.49,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="/static/images/products/cetirizine.png",
        ),
        Product(
            name="Omeprazole 20mg",
            manufacturer="AstraZeneca",
            description="Omeprazole 20mg is a proton pump inhibitor (PPI) that helps reduce stomach acid production. It is commonly used to treat acid reflux, heartburn, and gastroesophageal reflux disease (GERD). It also aids in the healing of ulcers and prevents damage to the esophagus caused by stomach acid.",
            price=10.99,
            expiry_date=datetime.now() + timedelta(days=1095),
            image_url="/static/images/products/omeprazole.webp",
        ),
        Product(
            name="Metformin 500mg Tablets",
            manufacturer="Sun Pharma",
            description="Metformin 500mg is a first-line medication for managing type 2 diabetes. It helps regulate blood sugar levels by improving insulin sensitivity and reducing glucose production in the liver. It is an essential part of diabetes management plans, often combined with diet and exercise.",
            price=7.99,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="/static/images/products/metformin.png",
        ),
        Product(
            name="Atorvastatin 20mg",
            manufacturer="Pfizer",
            description="Atorvastatin 20mg is a cholesterol-lowering medication that belongs to the statin class of drugs. It works by reducing levels of bad cholesterol (LDL) and triglycerides while increasing good cholesterol (HDL), lowering the risk of heart attacks and strokes in patients with high cholesterol.",
            price=14.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="/static/images/products/atorvastatin.png",
        ),
        Product(
            name="Albuterol Inhaler",
            manufacturer="Ventolin",
            description="The Albuterol Inhaler is a fast-acting bronchodilator designed to relieve and prevent symptoms of asthma and chronic obstructive pulmonary disease (COPD). It quickly opens airways, making it easier to breathe during acute asthma attacks or periods of respiratory distress.",
            price=29.99,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="/static/images/products/albuterol.png",
        ),
        Product(
            name="Loratadine 10mg Tablets",
            manufacturer="Claritin",
            description="Loratadine 10mg is a non-drowsy antihistamine used to relieve seasonal allergy symptoms, including sneezing, runny nose, and itchy or watery eyes. Its long-lasting formula provides 24-hour relief without causing sedation, making it ideal for daytime use.",
            price=6.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="/static/images/products/loratadine.webp",
        ),
        Product(
            name="Hydrochlorothiazide 25mg",
            manufacturer="Novartis",
            description="Hydrochlorothiazide 25mg is a diuretic medication used to treat high blood pressure and fluid retention (edema). By promoting the removal of excess salt and water from the body, it helps lower blood pressure and reduce swelling associated with heart, kidney, or liver conditions.",
            price=9.49,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="/static/images/products/hydrochlorothiazide.png",
        ),
        Product(
            name="Prednisone 20mg",
            manufacturer="Mylan",
            description="Prednisone 20mg is a corticosteroid medication that reduces inflammation and suppresses the immune system. It is used to treat a variety of conditions, including asthma, allergies, rheumatoid arthritis, and autoimmune diseases. It is also prescribed to manage severe inflammatory disorders.",
            price=15.99,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="/static/images/products/prednisone.png",
        ),
        Product(
            name="Losartan Potassium 50mg",
            manufacturer="Merck",
            description="Losartan Potassium 50mg is an angiotensin II receptor blocker (ARB) used to treat high blood pressure and protect the kidneys from damage due to diabetes. It helps relax blood vessels, improving blood flow and reducing the risk of cardiovascular events.",
            price=11.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="/static/images/products/losartan.png",
        ),
        Product(
            name="Clopidogrel 75mg",
            manufacturer="Sanofi",
            description="Clopidogrel 75mg is an antiplatelet medication that prevents blood clots in patients at risk of heart attacks or strokes. It is commonly prescribed after certain heart procedures or for individuals with a history of cardiovascular disease to reduce clot formation.",
            price=18.49,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="/static/images/products/clopidogrel.png",
        ),
        Product(
            name="Ranitidine 300mg",
            manufacturer="Zantac",
            description="Ranitidine 300mg is an H2 blocker that reduces stomach acid production. It is used to treat conditions such as acid reflux, ulcers, and Zollinger-Ellison syndrome. It provides quick and effective relief from heartburn and aids in the healing of acid-related damage to the stomach lining.",
            price=8.99,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="/static/images/products/ranitidine.webp",
        ),
        Product(
            name="Levothyroxine 100mcg",
            manufacturer="AbbVie",
            description="Levothyroxine 100mcg is a synthetic thyroid hormone used to treat hypothyroidism. It helps restore normal thyroid hormone levels, improving energy, metabolism, and overall well-being. It is essential for maintaining healthy thyroid function in individuals with underactive thyroid glands.",
            price=13.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="/static/images/products/levothyroxine.avif",
        ),
        Product(
            name="Azithromycin 500mg Tablets",
            manufacturer="Zithromax",
            description="Azithromycin 500mg is a macrolide antibiotic used to treat bacterial infections such as respiratory tract infections, skin infections, and sexually transmitted diseases. It is known for its convenience, often requiring a shorter course of treatment than other antibiotics.",
            price=19.99,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="/static/images/products/azithromycin.png",
        ),
        Product(
            name="Warfarin 5mg Tablets",
            manufacturer="Coumadin",
            description="Warfarin 5mg is an anticoagulant (blood thinner) used to prevent and treat blood clots in conditions such as deep vein thrombosis (DVT) and pulmonary embolism (PE). It is also prescribed to reduce the risk of stroke in patients with atrial fibrillation or artificial heart valves.",
            price=16.49,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="/static/images/products/warfarin.png",
        ),
        Product(
            name="Fluconazole 150mg",
            manufacturer="Pfizer",
            description="Fluconazole 150mg is an antifungal medication used to treat a variety of fungal and yeast infections, including vaginal candidiasis, oral thrush, and systemic fungal infections. Its single-dose treatment for certain conditions makes it a convenient and effective option.",
            price=12.49,
            expiry_date=datetime.now() + timedelta(days=540),
            image_url="/static/images/products/fluconazole.png",
        ),
        Product(
            name="Vitamin D3 1000 IU",
            manufacturer="Nature Made",
            description="Vitamin D3 1000 IU supports bone health, immune function, and overall wellness by aiding calcium absorption in the body. It is especially beneficial for individuals with limited sun exposure or those at risk of vitamin D deficiency. Ideal for daily supplementation.",
            price=9.99,
            expiry_date=datetime.now() + timedelta(days=1095),
            image_url="/static/images/products/vitamin-d3.webp",
        ),
    ]

    for product in products:
        existing_product = Product.query.filter_by(name=product.name).first()
        if not existing_product:
            db.session.add(product)

    db.session.commit()
    print("Products seeded successfully!")
