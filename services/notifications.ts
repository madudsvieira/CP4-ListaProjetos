import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function agendarNotificacao(titulo: string, corpo: string, data: Date) {
  await Notifications.scheduleNotificationAsync({
  content: {
    title: "Lembrete",
    body: "Você tem uma tarefa agendada!",
  },
  trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 5, repeats: false }
});
}
