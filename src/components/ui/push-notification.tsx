import type { Ref } from "react";
import { LogoMark } from "@/components/ui/Logo";
import styles from "./push-notification.module.css";

type PushNotificationProps = {
  className?: string;
  ref?: Ref<HTMLDivElement>;
  id?: string;
};

/** iOS-style push used in the hero intro and Scene B walkthrough. */
export function PushNotification({ className, ref, id }: PushNotificationProps) {
  return (
    <div
      ref={ref}
      id={id}
      className={className ? `${styles.card} ${className}` : styles.card}
    >
      <div className={styles.pic} aria-hidden>
        <LogoMark size={22} />
      </div>
      <div>
        <div className={styles.app}>VeloVane · now</div>
        <div className={styles.body}>
          <b>Your window today — 10:30 AM.</b> Storms at dawn. Hold for it.
        </div>
      </div>
    </div>
  );
}
