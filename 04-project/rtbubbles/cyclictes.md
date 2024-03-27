---
created: 2023-07-08T20:32
updated: 2024-03-26T23:32
tags:
  - 笔记
  - 笔记/实验
---

## 运行cyclictes的作用
```
/* Latency trick
 * if the file /dev/cpu_dma_latency exists,
 * open it and write a zero into it. This will tell
 * the power management system not to transition to
 * a high cstate (in fact, the system acts like idle=poll)
 * When the fd to /dev/cpu_dma_latency is closed, the behavior
 * goes back to the system default.
 *
 * Documentation/power/pm_qos_interface.txt
 */
static void set_latency_target(void)
{
	struct stat s;
	int err;

	if (laptop) {
		warn("not setting cpu_dma_latency to save battery power\n");
		return;
	}

	errno = 0;
	err = stat("/dev/cpu_dma_latency", &s);
	if (err == -1) {
		err_msg_n(errno, "WARN: stat /dev/cpu_dma_latency failed");
		return;
	}

	errno = 0;
	latency_target_fd = open("/dev/cpu_dma_latency", O_RDWR);
	if (latency_target_fd == -1) {
		err_msg_n(errno, "WARN: open /dev/cpu_dma_latency");
		return;
	}

	errno = 0;
	err = write(latency_target_fd, &latency_target_value, 4);
	if (err < 1) {
		err_msg_n(errno, "# error setting cpu_dma_latency to %d!", latency_target_value);
		close(latency_target_fd);
		return;
	}
	printf("# /dev/cpu_dma_latency set to %dus\n", latency_target_value);
}
```