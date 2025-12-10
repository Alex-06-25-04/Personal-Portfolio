import { useState, useRef, useEffect } from 'react';
// import degli hook React usati:
// - useState: per tenere lo stato booleano `inView`
// - useRef: per creare riferimenti mutabili che persistono tra render
// - useEffect: per eseguire codice con effetti collaterali (creazione/cleanup dell'Observer)

interface UseInViewOptions extends IntersectionObserverInit { };

type UseInViewReturn<T extends HTMLElement = HTMLElement> = [
    React.RefObject<T | null>,
    boolean
];

const useInView = <T extends HTMLElement = HTMLElement>(options?: UseInViewOptions): UseInViewReturn<T> => {
    // definizione dell'hook personalizzato che accetta un oggetto `options`
    // (passato direttamente a IntersectionObserver, es. { root, rootMargin, threshold })

    const [inView, setInView] = useState(false);
    // stato booleano che indica se l'elemento è entrato nella viewport secondo le `options`.
    // parte da false e diventerà true quando l'elemento interseca.

    const ref = useRef<T>(null); // ref è un container che conterrà il nodo DOM
    // valore che il componente consumer si aspetta di assegnare a un elemento DOM:
    // <div ref={ref}>...</div>
    // ref.current sarà il nodo DOM (o null fino al montaggio).

    const observerRef = useRef<IntersectionObserver | null>(null);
    // ref per salvare l'istanza di IntersectionObserver tra render,
    // così non la ricreiamo ogni volta e possiamo richiamare disconnect() da qualsiasi punto.

    useEffect(() => {
        // useEffect si esegue al montaggio e ogni volta che cambiano `options` o `inView`
        if (!observerRef.current) {
            // se non esiste ancora un observer, lo creiamo e lo salviamo in observerRef.current
            observerRef.current = new IntersectionObserver(([entry]) => {
                // callback dell'IntersectionObserver:
                // riceve un array di entries; qui si destruttura prendendo la prima voce ([entry])
                if (entry.isIntersecting && !inView) {
                    // se l'elemento è visibile (isIntersecting === true)
                    // e lo stato inView è ancora false (evitiamo setState inutili/infiniti loop)
                    setInView(true);
                    // aggiorna lo stato a true

                    if (observerRef.current) observerRef.current.disconnect();
                    // una volta che abbiamo rilevato l'entrata, disconnettiamo l'observer.
                    // comportamento intenzionale: osservazione "una tantum" (fai scattare solo la prima volta)
                }
            }, options);
            // l'observer viene creato con la callback sopra e con le `options` passate
        }

        const currentRef = ref.current;

        if (currentRef && observerRef.current) observerRef.current.observe(currentRef);
        // se il ref è collegato a un nodo DOM, iniziamo ad osservarlo
        // (se ref.current è null, significa che l'elemento non è ancora montato)

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
            // cleanup: quando il componente si smonta o l'effetto viene rieseguito,
            // disconnettiamo l'observer per liberare risorse e evitare memory leak.
        };
    }, [options, inView]);
    // dipendenze dell'effetto:
    // - options: se cambiano le options, ricreiamo (se necessario) e ri-osserviamo
    // - inView: usato nella callback; quando lo stato cambia l'effetto si riesegue
    //   (observerRef evita di ricreare l'observer più volte, ma l'effetto comunque si attiva)

    return [ref, inView];
    // l'hook restituisce una tupla:
    // - ref: da assegnare all'elemento da osservare
    // - inView: booleano che indica se l'elemento è entrato nella viewport
};

export default useInView;
// esportazione dell'hook per essere usato nei componenti
