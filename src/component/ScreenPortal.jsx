import { useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Renderiza `children` num div fora da tela (mas no DOM real),
 * chama onMount(firstChild) quando o React terminar de pintar.
 *
 * O container é criado ANTES do primeiro render (fora do useEffect)
 * para o createPortal ter um destino imediato.
 */
export default function ScreenPortal({ id, onMount, children }) {
  // Cria o container uma única vez (ref inicializado na 1ª chamada)
  const containerRef = useRef(null);
  if (!containerRef.current) {
    const el = document.createElement("div");
    el.id = `screen-portal-${id}`;
    el.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 900px;
      height: 550px;
      pointer-events: none;
      visibility: visible;
      overflow: hidden;
    `;
    document.body.appendChild(el);
    containerRef.current = el;
  }

  // useLayoutEffect: dispara após o DOM ser pintado, antes do browser renderizar
  // Garante que o firstElementChild já existe quando chamamos onMount
  useLayoutEffect(() => {
    const el = containerRef.current?.firstElementChild;
    if (el) onMount?.(el);

    return () => {
      containerRef.current?.remove();
      containerRef.current = null;
    };
  }, []);

  return createPortal(children, containerRef.current);
}