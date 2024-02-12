Povlačenje projekta: 
-Otvoriti GitBash i ukucati $git clone https://github.com/elab-development/internet-tehnologije-projekat-interaktivnikalendar_2020_0265
-Otvoriti novi powershell
-cd calendar
-composer global require laravel/installer
-composer install
-php artisan serve
-Otvoriti novi powershell
-cd front
-npm i
-npm start
-Otvoriti novi powershell
-php artisan migrate:fresh
-php artisan db:seed
-php artisan db:seed --class=UserRolesSeeder

Opis funkcionalnosti:
-Interaktivni kalendar sa mogućnostima dodavanja događaja i obaveštenja
-Stranica kalendara koja prikazuje sve događaje korsnika u zavisnosti od datuma
-Izmena događaja i obaveštenja nakon njihovog kreiranja
-Kategorije za događaje
-Uloge u sistemu: administrator, moderator, editor i helper, sa mogućnosti dodavanja novih
-Sortiranje događaja po raznim kriterijumima
-Pretraga po nazivu i filtriranje događaja po kategoriji
-Vremenska prognoza za dane do 5 dana unapred
-Postavljanje profilne fotografije
-Promena korisničkog imena, email-a i promena zaboravljene lozinke
